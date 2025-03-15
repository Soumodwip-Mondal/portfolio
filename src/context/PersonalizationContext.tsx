import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Define types for personalization data
export type ThemeOption = 'system' | 'light' | 'dark' | 'purple' | 'blue' | 'green';
export type LayoutOption = 'default' | 'compact' | 'spacious';
export type InterestCategory = 'development' | 'design' | 'data' | 'mobile' | 'ai';

interface VisitorLocation {
  country: string;
  city?: string;
  timezone?: string;
}

interface VisitorData {
  firstVisit: Date;
  lastVisit: Date;
  visitCount: number;
  location?: VisitorLocation;
}

interface InteractionData {
  clickedSections: Record<string, number>; // Section ID -> click count
  timeSpent: Record<string, number>; // Section ID -> seconds spent
  interests: InterestCategory[];
}

interface PersonalizationPreferences {
  theme: ThemeOption;
  layout: LayoutOption;
  showGreeting: boolean;
  showLocationBased: boolean;
}

interface PersonalizationContextType {
  // Visitor data
  visitorData: VisitorData;
  updateVisitorLocation: (location: VisitorLocation) => void;
  
  // Interaction tracking
  interactionData: InteractionData;
  trackSectionClick: (sectionId: string) => void;
  trackSectionTime: (sectionId: string, seconds: number) => void;
  addInterest: (interest: InterestCategory) => void;
  
  // User preferences
  preferences: PersonalizationPreferences;
  setTheme: (theme: ThemeOption) => void;
  setLayout: (layout: LayoutOption) => void;
  toggleGreeting: () => void;
  toggleLocationBased: () => void;
  
  // Derived data
  isReturningVisitor: boolean;
  topInterests: InterestCategory[];
  suggestedSections: string[];
  
  // Reset
  resetPersonalization: () => void;
}

// Create the context with default values
const PersonalizationContext = createContext<PersonalizationContextType>({
  visitorData: {
    firstVisit: new Date(),
    lastVisit: new Date(),
    visitCount: 1
  },
  updateVisitorLocation: () => {},
  
  interactionData: {
    clickedSections: {},
    timeSpent: {},
    interests: []
  },
  trackSectionClick: () => {},
  trackSectionTime: () => {},
  addInterest: () => {},
  
  preferences: {
    theme: 'system',
    layout: 'default',
    showGreeting: false,
    showLocationBased: true
  },
  setTheme: () => {},
  setLayout: () => {},
  toggleGreeting: () => {},
  toggleLocationBased: () => {},
  
  isReturningVisitor: false,
  topInterests: [],
  suggestedSections: [],
  
  resetPersonalization: () => {}
});

// Storage keys
const VISITOR_DATA_KEY = 'portfolio_visitor_data';
const INTERACTION_DATA_KEY = 'portfolio_interaction_data';
const PREFERENCES_KEY = 'portfolio_preferences';

// Provider component
export const PersonalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or with defaults
  const [visitorData, setVisitorData] = useState<VisitorData>(() => {
    const storedData = localStorage.getItem(VISITOR_DATA_KEY);
    if (storedData) {
      const parsed = JSON.parse(storedData);
      return {
        ...parsed,
        firstVisit: new Date(parsed.firstVisit),
        lastVisit: new Date(parsed.lastVisit)
      };
    }
    return {
      firstVisit: new Date(),
      lastVisit: new Date(),
      visitCount: 1
    };
  });
  
  const [interactionData, setInteractionData] = useState<InteractionData>(() => {
    const storedData = localStorage.getItem(INTERACTION_DATA_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return {
      clickedSections: {},
      timeSpent: {},
      interests: []
    };
  });
  
  const [preferences, setPreferences] = useState<PersonalizationPreferences>(() => {
    const storedData = localStorage.getItem(PREFERENCES_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return {
      theme: 'system',
      layout: 'default',
      showGreeting: false,
      showLocationBased: true
    };
  });
  
  // Derived state
  const isReturningVisitor = visitorData.visitCount > 1;
  
  // Get top interests based on interaction data
  const topInterests = useMemo(() => {
    const { interests } = interactionData;
    const interestCounts: Record<string, number> = {};
    
    // Count direct interests
    interests.forEach(interest => {
      interestCounts[interest] = (interestCounts[interest] || 0) + 1;
    });
    
    // Add weight from clicked sections
    Object.entries(interactionData.clickedSections).forEach(([section, count]) => {
      // Map sections to interests (simplified mapping)
      const sectionToInterest: Record<string, InterestCategory> = {
        'projects': 'development',
        'skills': 'development',
        'dashboard': 'data',
        'ai-assistant': 'ai',
        'voice-control': 'ai',
        'augmented-reality': 'mobile'
      };
      
      const interest = sectionToInterest[section];
      if (interest) {
        interestCounts[interest] = (interestCounts[interest] || 0) + count;
      }
    });
    
    // Sort interests by count and return top 3
    return Object.entries(interestCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([interest]) => interest as InterestCategory);
  }, [interactionData]);
  
  // Suggest sections based on interests
  const suggestedSections = useMemo(() => {
    const interestToSections: Record<InterestCategory, string[]> = {
      'development': ['projects', 'skills', 'collaborate'],
      'design': ['projects', 'augmented-reality'],
      'data': ['dashboard', 'skills'],
      'mobile': ['augmented-reality', 'voice-control'],
      'ai': ['ai-assistant', 'voice-control']
    };
    
    // Collect sections from top interests
    const sections = topInterests.flatMap(interest => interestToSections[interest] || []);
    
    // Remove duplicates and return
    return [...new Set(sections)];
  }, [topInterests]);
  
  // Update visitor data on mount
  useEffect(() => {
    const now = new Date();
    setVisitorData(prev => ({
      ...prev,
      lastVisit: now,
      visitCount: prev.visitCount + 1
    }));
  }, []);
  
  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(VISITOR_DATA_KEY, JSON.stringify(visitorData));
  }, [visitorData]);
  
  useEffect(() => {
    localStorage.setItem(INTERACTION_DATA_KEY, JSON.stringify(interactionData));
  }, [interactionData]);
  
  useEffect(() => {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  }, [preferences]);
  
  // Fetch visitor location on first visit
  useEffect(() => {
    if (!visitorData.location) {
      const fetchLocation = async () => {
        try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          
          if (data.country_name) {
            updateVisitorLocation({
              country: data.country_name,
              city: data.city,
              timezone: data.timezone
            });
          }
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      };
      
      fetchLocation();
    }
  }, [visitorData.location]);  // Added dependency
  
  // Handler functions
  const updateVisitorLocation = (location: VisitorLocation) => {
    setVisitorData(prev => ({
      ...prev,
      location
    }));
  };
  
  const trackSectionClick = (sectionId: string) => {
    setInteractionData(prev => ({
      ...prev,
      clickedSections: {
        ...prev.clickedSections,
        [sectionId]: (prev.clickedSections[sectionId] || 0) + 1
      }
    }));
  };
  
  const trackSectionTime = (sectionId: string, seconds: number) => {
    setInteractionData(prev => ({
      ...prev,
      timeSpent: {
        ...prev.timeSpent,
        [sectionId]: (prev.timeSpent[sectionId] || 0) + seconds
      }
    }));
  };
  
  const addInterest = (interest: InterestCategory) => {
    setInteractionData(prev => ({
      ...prev,
      interests: [...prev.interests, interest]
    }));
  };
  
  const setTheme = (theme: ThemeOption) => {
    setPreferences(prev => ({
      ...prev,
      theme
    }));
  };
  
  const setLayout = (layout: LayoutOption) => {
    setPreferences(prev => ({
      ...prev,
      layout
    }));
  };
  
  const toggleGreeting = () => {
    setPreferences(prev => ({
      ...prev,
      showGreeting: !prev.showGreeting
    }));
  };
  
  const toggleLocationBased = () => {
    setPreferences(prev => ({
      ...prev,
      showLocationBased: !prev.showLocationBased
    }));
  };
  
  const resetPersonalization = () => {
    localStorage.removeItem(VISITOR_DATA_KEY);
    localStorage.removeItem(INTERACTION_DATA_KEY);
    localStorage.removeItem(PREFERENCES_KEY);
    
    setVisitorData({
      firstVisit: new Date(),
      lastVisit: new Date(),
      visitCount: 1
    });
    
    setInteractionData({
      clickedSections: {},
      timeSpent: {},
      interests: []
    });
    
    setPreferences({
      theme: 'system',
      layout: 'default',
      showGreeting: false,
      showLocationBased: true
    });
  };
  
  const contextValue: PersonalizationContextType = {
    visitorData,
    updateVisitorLocation,
    
    interactionData,
    trackSectionClick,
    trackSectionTime,
    addInterest,
    
    preferences,
    setTheme,
    setLayout,
    toggleGreeting,
    toggleLocationBased,
    
    isReturningVisitor,
    topInterests,
    suggestedSections,
    
    resetPersonalization
  };
  
  return (
    <PersonalizationContext.Provider value={contextValue}>
      {children}
    </PersonalizationContext.Provider>
  );
};

// Custom hook to use the personalization context
export const usePersonalization = () => useContext(PersonalizationContext);