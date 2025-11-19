
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
// PRODUCTS and CATEGORIES mocks removed to force DB usage

// Define Types
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew: boolean;
  description: string;
  installments: string;
  rating: number;
  reviews: number;
  gallery: string[];
  longDescription: string;
  specs: Record<string, string>;
}

export interface Category {
  id?: number;
  title: string;
  iconName: string; 
  color: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  title: string;
}

interface DataContextType {
  products: Product[];
  categories: Category[];
  gallery: GalleryImage[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  
  // Actions
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  
  addCategory: (category: Category) => Promise<void>;
  deleteCategory: (title: string) => Promise<void>;
  
  addToGallery: (url: string, title: string) => Promise<void>;
  removeFromGallery: (id: number) => Promise<void>;

  // File Upload
  uploadImage: (file: File) => Promise<string | null>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper to map DB result to App Type
const mapProductFromDB = (p: any): Product => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: Number(p.price),
  image: p.image,
  isNew: p.is_new, // Map snake_case to camelCase
  description: p.description,
  longDescription: p.long_description, // Map snake_case
  installments: p.installments,
  rating: Number(p.rating),
  reviews: Number(p.reviews),
  gallery: Array.isArray(p.gallery) ? p.gallery : (p.image ? [p.image] : []),
  specs: p.specs || {}
});

// Helper to map App Type to DB columns
const mapProductToDB = (p: Partial<Product>) => ({
  name: p.name,
  category: p.category,
  price: p.price,
  image: p.image,
  is_new: p.isNew,
  description: p.description,
  long_description: p.longDescription,
  installments: p.installments,
  rating: p.rating,
  reviews: p.reviews,
  gallery: p.gallery,
  specs: p.specs
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Initial Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // 1. Products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: false });
        
        if (!productsError && productsData) {
           setProducts(productsData.map(mapProductFromDB));
        }

        // 2. Categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('id', { ascending: true });
        
        if (!categoriesError && categoriesData) {
          setCategories(categoriesData.map(c => ({
              id: c.id,
              title: c.title,
              iconName: c.icon_name,
              color: c.color
          })));
        }

        // 3. Gallery
        const { data: galleryData } = await supabase
          .from('gallery')
          .select('*')
          .order('id', { ascending: false });
          
        if (galleryData) setGallery(galleryData as GalleryImage[]);

        // 4. Session
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);

      } catch (e) {
        console.error("Supabase connection error:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Auth
  const login = async (email: string, password: string) => {
    // Demo/Master Access fallback if needed, but primarily use Supabase
    if (email === 'admin@centerparque.com' && password === 'admin123') {
      // Check if we can login with supabase first
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error) return { error: null };
      
      // If supabase auth fails (user not created yet), allow master bypass ONLY for development
      // For production, remove this line and ensure user exists in Supabase Auth
      setIsAuthenticated(true);
      return { error: null }; 
    }
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  // Storage Upload
  const uploadImage = async (file: File) => {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return null;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images') 
        .upload(filePath, file);

      if (uploadError) {
        console.error("Supabase Storage Error:", uploadError);
        alert(`Erro no upload: ${uploadError.message}`);
        return null;
      }

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  // Product Actions
  const addProduct = async (product: Omit<Product, 'id'>) => {
    const dbPayload = mapProductToDB(product);
    const { data, error } = await supabase.from('products').insert(dbPayload).select().single();
    
    if (!error && data) {
      setProducts(prev => [mapProductFromDB(data), ...prev]);
    } else {
      console.error("Error adding product:", error);
      alert("Erro ao salvar produto. Verifique se você está logado.");
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
     const dbPayload = mapProductToDB(updatedProduct);
     const { error } = await supabase
      .from('products')
      .update(dbPayload)
      .eq('id', updatedProduct.id);

    if (!error) {
      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    } else {
      console.error("Error updating product:", error);
      alert("Erro ao atualizar produto.");
    }
  };

  const deleteProduct = async (id: number) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id));
    } else {
      console.error("Error deleting product:", error);
      alert("Erro ao excluir produto.");
    }
  };

  // Category Actions
  const addCategory = async (category: Category) => {
    const dbCategory = {
        title: category.title,
        icon_name: category.iconName,
        color: category.color
    };
    const { data, error } = await supabase.from('categories').insert(dbCategory).select().single();
    if (!error && data) {
        setCategories(prev => [...prev, { 
          id: data.id, 
          title: data.title, 
          iconName: data.icon_name, 
          color: data.color 
        }]);
    } else {
       console.error("Error adding category:", error);
    }
  };

  const deleteCategory = async (title: string) => {
    const { error } = await supabase.from('categories').delete().eq('title', title);
    if (!error) {
      setCategories(prev => prev.filter(c => c.title !== title));
    }
  };

  // Gallery Actions
  const addToGallery = async (url: string, title: string) => {
    const { data, error } = await supabase.from('gallery').insert({ url, title }).select().single();
    if (!error && data) {
      setGallery(prev => [data, ...prev]);
    } else {
      console.error("Error adding to gallery:", error);
    }
  };

  const removeFromGallery = async (id: number) => {
    const { error } = await supabase.from('gallery').delete().eq('id', id);
    if (!error) {
      setGallery(prev => prev.filter(g => g.id !== id));
    }
  };

  return (
    <DataContext.Provider value={{
      products,
      categories,
      gallery,
      isAuthenticated,
      isLoading,
      login,
      logout,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      deleteCategory,
      addToGallery,
      removeFromGallery,
      uploadImage
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
