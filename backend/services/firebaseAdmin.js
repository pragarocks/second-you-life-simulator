const admin = require('firebase-admin');

class FirebaseService {
  constructor() {
    this.initialized = false;
    this.db = null;
    
    try {
      // Initialize Firebase Admin SDK
      if (!admin.apps.length) {
        const config = {
          projectId: process.env.FIREBASE_PROJECT_ID,
        };

        // Use service account if available
        if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
          config.credential = admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          });
        }

        admin.initializeApp(config);
      }

      this.db = admin.firestore();
      this.initialized = true;
      console.log('✅ Firebase Admin initialized successfully');

    } catch (error) {
      console.warn('⚠️ Firebase initialization failed:', error.message);
      console.warn('⚠️ Firebase features will be disabled');
      this.initialized = false;
    }
  }

  /**
   * Save a simulation result to Firestore
   */
  async saveSimulation(userId, simulationData) {
    if (!this.initialized) {
      console.warn('Firebase not initialized, skipping save');
      return null;
    }

    try {
      const docRef = await this.db.collection('simulations').add({
        userId: userId || 'anonymous',
        ...simulationData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log('✅ Simulation saved to Firebase:', docRef.id);
      return docRef.id;

    } catch (error) {
      console.error('❌ Error saving simulation:', error);
      return null;
    }
  }

  /**
   * Get user's simulation history
   */
  async getUserSimulations(userId, limit = 10) {
    if (!this.initialized) {
      return [];
    }

    try {
      const snapshot = await this.db
        .collection('simulations')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();

      const simulations = [];
      snapshot.forEach(doc => {
        simulations.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return simulations;

    } catch (error) {
      console.error('❌ Error fetching user simulations:', error);
      return [];
    }
  }

  /**
   * Get a specific simulation by ID
   */
  async getSimulation(simulationId) {
    if (!this.initialized) {
      return null;
    }

    try {
      const doc = await this.db.collection('simulations').doc(simulationId).get();
      
      if (!doc.exists) {
        return null;
      }

      return {
        id: doc.id,
        ...doc.data(),
      };

    } catch (error) {
      console.error('❌ Error fetching simulation:', error);
      return null;
    }
  }

  /**
   * Update simulation metadata (e.g., mark as favorite)
   */
  async updateSimulation(simulationId, updateData) {
    if (!this.initialized) {
      return false;
    }

    try {
      await this.db.collection('simulations').doc(simulationId).update({
        ...updateData,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log('✅ Simulation updated:', simulationId);
      return true;

    } catch (error) {
      console.error('❌ Error updating simulation:', error);
      return false;
    }
  }

  /**
   * Delete a simulation
   */
  async deleteSimulation(simulationId) {
    if (!this.initialized) {
      return false;
    }

    try {
      await this.db.collection('simulations').doc(simulationId).delete();
      console.log('✅ Simulation deleted:', simulationId);
      return true;

    } catch (error) {
      console.error('❌ Error deleting simulation:', error);
      return false;
    }
  }

  /**
   * Get analytics data (for admin use)
   */
  async getAnalytics() {
    if (!this.initialized) {
      return null;
    }

    try {
      const snapshot = await this.db.collection('simulations').get();
      const total = snapshot.size;

      // Get simulations from last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const recentSnapshot = await this.db
        .collection('simulations')
        .where('createdAt', '>=', sevenDaysAgo)
        .get();

      const recent = recentSnapshot.size;

      return {
        totalSimulations: total,
        recentSimulations: recent,
        timestamp: new Date().toISOString(),
      };

    } catch (error) {
      console.error('❌ Error fetching analytics:', error);
      return null;
    }
  }

  /**
   * Check if Firebase is properly initialized
   */
  isInitialized() {
    return this.initialized;
  }
}

// Export singleton instance
module.exports = new FirebaseService(); 