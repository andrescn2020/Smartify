import swal from 'sweetalert';

const initialState = {
  phones: [],
  phonesForSelect: [],
  phonesId: [],
  modo: JSON.parse(localStorage.getItem("modoOscuro"))? JSON.parse(localStorage.getItem("modoOscuro")) : 'light',
  currentPage: JSON.parse(localStorage.getItem("currentPage")) || 1,
  brands: [],
  rams: [],
  roms: [],
  networks: [],
  processors: [],
  cart: [],
  currentItem: null,
  filtered: {
    byRom: null,
    byRam: null,
    byBrand: null,
    byPrice: null,
    byNetwork: null,
    byProcessor: null,
    byOrder: null,
  },
  favs: [],
  users: [],
  user: {},
  count: 1,
  questions: [],
  loading: true,
  language: JSON.parse(localStorage.getItem("l")) ? JSON.parse(localStorage.getItem("l")) : 'es'
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PHONES':

      return {
        ...state,
        phonesForSelect: action.payload,
        loading: false
      }
      case 'LOADING':

        return {
          ...state,
          loading: true
        }

        case 'CANCEL_LOADING':

          return {
            ...state,
            loading: false
          }

    case "SET_SELECTS":
  
        let brand = [];
        let ram = [];
        let rom = [];
        let network = [];
        let processor = [];

        let allBrands = new Set();
        let allRams = new Set();
        let allRoms = new Set();
        let allNetworks = new Set();
        let allProcessors = new Set();
  
        state.phonesForSelect.map((phone) => allBrands.add(phone.brand));
  
        allBrands.forEach(function (e) {
  
          brand.push(e);
  
        })
  
        //localStorage.setItem("brand", JSON.stringify(brand));
  
        state.phonesForSelect.map((phone) => allRams.add(phone.ram));
  
        allRams.forEach(function (e) {
  
          ram.push(e);
  
        })
  
         //localStorage.setItem("ram", JSON.stringify(ram));
  
        state.phonesForSelect.map((phone) => allRoms.add(phone.rom));
  
        allRoms.forEach(function (e) {
  
          rom.push(e);
  
        })
  
         //localStorage.setItem("rom", JSON.stringify(rom));
  
        state.phonesForSelect.map((phone) => allNetworks.add(phone.network));
  
        allNetworks.forEach(function (e) {
  
          network.push(e);
  
        })
        
         //localStorage.setItem("network", JSON.stringify(network));
  
        state.phonesForSelect.map((phone) => allProcessors.add(phone.processor));
  
        allProcessors.forEach(function (e) {
  
          processor.push(e);
  
        })
  
         //localStorage.setItem("processor", JSON.stringify(processor));
    

  return {
    ...state,
    // brands: JSON.parse(localStorage.getItem("brand")),
    // rams: JSON.parse(localStorage.getItem("ram")),
    // roms: JSON.parse(localStorage.getItem("rom")),
    // networks: JSON.parse(localStorage.getItem("network")),
    // processors: JSON.parse(localStorage.getItem("processor"))
    brands: brand,
    rams: ram,
    roms: rom,
    networks: network,
    processors: processor
  }

    case "CLEAN_UP":
  return {
    ...state,
    phonesId: action.payload
  }
    case "SET_PAGE": {

    let pageToView

    if (
      parseInt(action.payload) < 1 ||
      parseInt(action.payload) > Math.ceil(state.phones.length / 4) ||
      isNaN(parseInt(action.payload))
    ) {
      pageToView = 1;
    } else {
      pageToView = action.payload;
    }

    localStorage.setItem("currentPage", JSON.stringify(pageToView))

    return {
      ...state,
      currentPage: action.payload
    }
  }

    case "PAGE_ONE": {

    localStorage.setItem("currentPage", JSON.stringify(action.payload))

    return {
      ...state,
      currentPage: action.payload
    }
  }

  case 'GET_USER':
    return {
      ...state,
      user: action.payload
    }

    case 'GET_USERS':
  let usersWithouthSuperAdmin = action.payload.filter(element => element.email !== "finalproyect25a@gmail.com");
  return {
    ...state,
    users: usersWithouthSuperAdmin
  }

    case 'GET_PHONES_BY_NAME':
  return {
    ...state,
    phones: action.payload
  }
    case 'GET_LOCAL_CART':
  var currentCart = JSON.parse(localStorage.getItem("cart")) || []
  return { ...state, cart: currentCart }
    case 'GET_DETAILS':
      console.log( action.payload);
  return {
    ...state,
    phonesId: action.payload
  }
    case "GET_LOCAL_FILTERS":
  let currentFilter = JSON.parse(localStorage.getItem("filter")) || []
  return {
    ...state,
    //phones:currentFilter,
    filtered: currentFilter
  }
    case 'FILTERS':
      
  return {
    ...state,
    phones: action.payload,
    filtered: action.maxifiltros
  }
    case 'ADD_TO_CART':
  // Great Item data from products array
  const item = state.phones.find(
    (product) => product.id === action.payload.id);
  // Check if Item is in cart already
  const inCart = state.cart.find((item) =>
    item.id === action.payload.id ? true : false
  );

  const newCart = inCart
    ? state.cart.map((item) => item.id === action.payload.id
      ? { ...item, qty: item.qty + 1 }
      : item
    )
    : [...state.cart, { ...item, qty: 1 }]

  localStorage.setItem("cart", JSON.stringify(newCart))
  swal('Agregaste correctamente el producto al carrito')
  return {
    ...state,
    cart: newCart
  };
    case "ADD_TO_CART_USER":
  const itemUser = state.phones.find(
    (product) => product.id === action.payload.id);
  // Check if Item is in cart already
  const inCartUser = state.cart.find((item) =>
    item.id === action.payload.id ? true : false);

  const newCartUser = inCartUser
    ? state.cart.map((item) => item.id === action.payload.id
      ? { ...itemUser, qty: item.qty + 1 }
      : item
    )
    : [...state.cart, { ...itemUser, qty: 1 }]

  localStorage.setItem("cart", JSON.stringify(newCartUser))
  swal('Agregaste correctamente el producto al carrito')

  return {
    ...state,
    cart: newCartUser
  };
    case "REMOVE_FROM_CART_USER":
  let removeCartUser = state.cart.filter((item) => item.id !== action.payload.id)
  localStorage.setItem("cart", JSON.stringify(removeCartUser));
  return {
    ...state,
    cart: removeCartUser
  };
    case 'REMOVE_FROM_CART':
  let removeCart = state.cart.filter((item) => item.id !== action.payload.id)
  localStorage.setItem("cart", JSON.stringify(removeCart));
  return {
    ...state,
    cart: removeCart
  };
    case "CLEAR_CART_POST_BUY":
    localStorage.removeItem('cart');
  return {
    ...state,
    cart: []
  };
    case 'ADJUST_ITEM_QTY':
  let newQtyCart = state.cart.map((item) => item.id === action.payload.id
    ? { ...item, qty: + action.payload.qty }
    : item
  )
  localStorage.setItem("cart", JSON.stringify(newQtyCart))
  return {
    ...state,
    cart: newQtyCart
  };
    case 'LOAD_CURRENT_ITEM':
  return {
    ...state,
    currentItem: action.payload,
  };
    case 'ADMIN_POSTS':
  return {
    ...state,
    phones: action.payload
  }
    case "EDIT_POSTS":
  return {
    ...state,
    phones: action.payload,
    phonesId: action.payload
  }
    case "USERS_ADMIN":
  return {
    ...state,
    users: action.payload,
  };
    case "GET_QUESTIONS":
  return {
    ...state,
    questions: action.payload,
  };
    case "LANGUAGE":
  localStorage.setItem('l', JSON.stringify(action.payload));
  return {
    ...state,
    language: action.payload
  }
    case 'GET_LOCAL_FAVS':
  var currentFavs = JSON.parse(localStorage.getItem("favs")) || []
  return {
    ...state,
    favs: currentFavs
  }
    case "REMOVE_FAVS":
  let removePhoneFromLocalStorage = state.favs.filter((e) => e !== action.payload.id)
  localStorage.setItem("favs", JSON.stringify(removePhoneFromLocalStorage));
  return {
    ...state,
    favs: removePhoneFromLocalStorage
  }
    case "ADD_FAVS":
  console.log(action.payload)
  const fav = state.phones.find((product) => product.id === action.payload.id);

  const inFavs = state.favs.find((item) =>
    item === action.payload.id ? true : false
  );

  const newFav = inFavs
    ? state.favs.find((e) => e !== action.payload.id)
      ? [fav.id]
      : null
    : [...state.favs, fav.id]

  localStorage.setItem("favs", JSON.stringify(newFav))
  return {
    ...state,
    favs: newFav
  }
  case "MODO_OSCURO" :
                    if(action.payload === "light"){
                      localStorage.setItem('modoOscuro', JSON.stringify('light'));
                    }else{
                      localStorage.setItem('modoOscuro', JSON.stringify('dark'));
                    }
           
                  return {
                    ...state,
                    modo: JSON.parse(localStorage.getItem("modoOscuro"))
                  }
    default:
  return state;
}
}

export default rootReducer;
