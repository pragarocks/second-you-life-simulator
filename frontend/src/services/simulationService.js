import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  getDoc 
} from 'firebase/firestore';
import { db } from '../firebase/config';

class SimulationService {
  constructor() {
    this.collectionName = 'simulations';
  }

  // Save a new simulation
  async saveSimulation(userId, simulationData, originalFormData) {
    try {
      const simulationDoc = {
        userId,
        title: this.generateTitle(originalFormData),
        description: originalFormData.alternatePath,
        originalData: originalFormData,
        alternatePath: simulationData.alternatePath,
        currentPath: simulationData.currentPath,
        metadata: simulationData.metadata,
        isFavorite: false,
        tags: this.generateTags(originalFormData),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, this.collectionName), simulationDoc);
      
      return {
        id: docRef.id,
        ...simulationDoc
      };
    } catch (error) {
      console.error('Error saving simulation:', error);
      throw error;
    }
  }

  // Get all simulations for a user
  async getUserSimulations(userId, limitCount = 20) {
    try {
      // Temporarily remove orderBy to avoid composite index requirement
      const q = query(
        collection(db, this.collectionName),
        where('userId', '==', userId),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const simulations = [];

      querySnapshot.forEach((doc) => {
        simulations.push({
          id: doc.id,
          ...doc.data()
        });
      });

      // Sort manually since we removed orderBy
      simulations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return simulations;
    } catch (error) {
      console.error('Error getting user simulations:', error);
      throw error;
    }
  }

  // Get favorite simulations for a user
  async getFavoriteSimulations(userId) {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('userId', '==', userId),
        where('isFavorite', '==', true)
      );

      const querySnapshot = await getDocs(q);
      const favorites = [];

      querySnapshot.forEach((doc) => {
        favorites.push({
          id: doc.id,
          ...doc.data()
        });
      });

      // Sort manually since we removed orderBy
      favorites.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return favorites;
    } catch (error) {
      console.error('Error getting favorite simulations:', error);
      throw error;
    }
  }

  // Toggle favorite status
  async toggleFavorite(simulationId) {
    try {
      const simulationRef = doc(db, this.collectionName, simulationId);
      const simulationDoc = await getDoc(simulationRef);
      
      if (simulationDoc.exists()) {
        const currentFavoriteStatus = simulationDoc.data().isFavorite;
        await updateDoc(simulationRef, {
          isFavorite: !currentFavoriteStatus,
          updatedAt: new Date().toISOString()
        });
        
        return !currentFavoriteStatus;
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }

  // Delete a simulation
  async deleteSimulation(simulationId) {
    try {
      await deleteDoc(doc(db, this.collectionName, simulationId));
    } catch (error) {
      console.error('Error deleting simulation:', error);
      throw error;
    }
  }

  // Search simulations by text
  async searchSimulations(userId, searchTerm) {
    try {
      // Note: This is a simple client-side search. For production,
      // consider using Algolia or similar for better search capabilities
      const allSimulations = await this.getUserSimulations(userId, 100);
      
      const searchLower = searchTerm.toLowerCase();
      
      return allSimulations.filter(sim => 
        sim.title.toLowerCase().includes(searchLower) ||
        sim.description.toLowerCase().includes(searchLower) ||
        sim.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        sim.originalData.profession.toLowerCase().includes(searchLower) ||
        sim.originalData.location.toLowerCase().includes(searchLower)
      );
    } catch (error) {
      console.error('Error searching simulations:', error);
      throw error;
    }
  }

  // Helper function to generate a title from form data
  generateTitle(originalData) {
    const profession = originalData.profession || 'Unknown profession';
    const location = originalData.location || 'Unknown location';
    const date = new Date().toLocaleDateString();
    
    return `Life Path Simulation - ${profession} in ${location} (${date})`;
  }

  // Helper function to generate tags
  generateTags(originalData) {
    const tags = [];
    
    if (originalData.profession) {
      tags.push(originalData.profession);
    }
    
    if (originalData.location) {
      tags.push(originalData.location);
    }
    
    if (originalData.age) {
      if (originalData.age < 25) tags.push('young-adult');
      else if (originalData.age < 35) tags.push('early-career');
      else if (originalData.age < 45) tags.push('mid-career');
      else tags.push('experienced');
    }

    // Extract key themes from the alternate path
    const alternatePath = originalData.alternatePath?.toLowerCase() || '';
    
    if (alternatePath.includes('career') || alternatePath.includes('job')) tags.push('career-change');
    if (alternatePath.includes('move') || alternatePath.includes('relocate')) tags.push('relocation');
    if (alternatePath.includes('start') || alternatePath.includes('business')) tags.push('entrepreneurship');
    if (alternatePath.includes('school') || alternatePath.includes('study')) tags.push('education');
    if (alternatePath.includes('travel')) tags.push('travel');
    if (alternatePath.includes('relationship') || alternatePath.includes('marriage')) tags.push('relationships');
    
    return tags;
  }

  // Get simulation by ID
  async getSimulation(simulationId) {
    try {
      const docRef = doc(db, this.collectionName, simulationId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        throw new Error('Simulation not found');
      }
    } catch (error) {
      console.error('Error getting simulation:', error);
      throw error;
    }
  }
}

const simulationService = new SimulationService();
export default simulationService; 