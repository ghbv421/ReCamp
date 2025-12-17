// --- MOCK API MODE ---

let mockPlaces = [];
let mockReservations = []; 

// ✅ Helper to generate RCP IDs
const generateTransactionId = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6 digit random
  return `RCP${randomNum}`;
};

export const placesAPI = {
  getAll: async () => {
    return { data: mockPlaces }; 
  },
  getOne: async (id) => {
    const place = mockPlaces.find(p => p._id === id);
    return { data: place };
  },
  delete: async (id) => {
    mockPlaces = mockPlaces.filter(p => p._id !== id);
    return { data: { message: 'Deleted' } };
  },
  create: async (formData) => {
    const imageFile = formData.get('image');
    let finalImageUri = null;
    
    if (imageFile && imageFile.uri) {
        finalImageUri = imageFile.uri;
    } else if (typeof imageFile === 'string') {
        finalImageUri = imageFile;
    }

    const newPlace = {
      _id: Math.random().toString(), 
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'), 
      entranceFee: formData.get('entranceFee'), 
      overnightFee: formData.get('overnightFee'),
      directions: formData.get('directions'),
      tips: formData.get('tips'),
      highlights: formData.get('highlights'),
      price: formData.get('price'),
      imageUrl: finalImageUri 
    };

    mockPlaces.unshift(newPlace); 
    return { data: newPlace };
  },
  update: async (id, formData) => {
    const index = mockPlaces.findIndex(p => p._id === id);
    if (index !== -1) {
      const imageFile = formData.get('image');
      let finalImageUri = mockPlaces[index].imageUrl;

      if (imageFile && imageFile.uri) {
        finalImageUri = imageFile.uri;
      } else if (typeof imageFile === 'string') {
        finalImageUri = imageFile;
      }

      mockPlaces[index] = {
        ...mockPlaces[index],
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        entranceFee: formData.get('entranceFee'),
        overnightFee: formData.get('overnightFee'),
        directions: formData.get('directions'),
        tips: formData.get('tips'),
        highlights: formData.get('highlights'),
        price: formData.get('price'),
        imageUrl: finalImageUri
      };
    }
    return { data: mockPlaces[index] };
  },
};

export const reservationAPI = {
  create: async (data) => {
    // ✅ CHANGED: Uses RCP format
    const newBooking = { ...data, _id: generateTransactionId() };
    mockReservations.unshift(newBooking);
    return { data: newBooking };
  },
  getAll: async () => {
    return { data: mockReservations };
  },
  delete: async (id) => {
    mockReservations = mockReservations.filter(r => r._id !== id);
    return { data: { message: 'Cancelled' } };
  }
};

export default { placesAPI, reservationAPI };