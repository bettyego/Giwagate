/**
 * Image library.
 *
 * Every image currently in use is temporary stock photography from Unsplash
 * (free to use under the Unsplash License). They are flagged `stock: true`,
 * which labels them on the site as illustrative so they are never mistaken
 * for Giwagate listings or premises.
 *
 * To use real photography: add the file to src/assets/, import it here
 * twice (plain, and with the `?w=…&format=webp&as=srcset` query), point the
 * relevant entry at both and set `stock: false`.
 *
 * `src` is the original JPEG, used only by browsers that can't read WebP.
 * `srcSet` holds smaller WebP copies generated at build time by vite-imagetools.
 */
import heroDusk from '../assets/stock/hero-dusk-residence.jpg'
import heroDuskSet from '../assets/stock/hero-dusk-residence.jpg?w=1400;2000&format=webp&as=srcset'
import heroDuskSm from '../assets/stock/hero-dusk-residence-sm.jpg?format=webp'
import villaTerrace from '../assets/stock/villa-terrace.jpg'
import villaTerraceSet from '../assets/stock/villa-terrace.jpg?w=480;800;1200;1400&format=webp&as=srcset'
import whiteVilla from '../assets/stock/white-villa.jpg'
import whiteVillaSet from '../assets/stock/white-villa.jpg?w=480;800;1200;1400&format=webp&as=srcset'
import poolHouse from '../assets/stock/pool-house.jpg'
import poolHouseSet from '../assets/stock/pool-house.jpg?w=480;800;1200;1400&format=webp&as=srcset'
import timberFacade from '../assets/stock/timber-facade.jpg'
import timberFacadeSet from '../assets/stock/timber-facade.jpg?w=480;800;1200;1400&format=webp&as=srcset'
import courtyardHouse from '../assets/stock/courtyard-house.jpg'
import courtyardHouseSet from '../assets/stock/courtyard-house.jpg?w=480;800;1200;1400&format=webp&as=srcset'
import livingWarm from '../assets/stock/living-room-warm.jpg'
import livingWarmSet from '../assets/stock/living-room-warm.jpg?w=480;800;1200;1600&format=webp&as=srcset'
import livingModern from '../assets/stock/living-room-modern.jpg'
import livingModernSet from '../assets/stock/living-room-modern.jpg?w=480;800;1200;1400&format=webp&as=srcset'
import openPlanStair from '../assets/stock/open-plan-stair.jpg'
import openPlanStairSet from '../assets/stock/open-plan-stair.jpg?w=480;800;1200;1400&format=webp&as=srcset'
import officeInterior from '../assets/stock/office-interior.jpg'
import officeInteriorSet from '../assets/stock/office-interior.jpg?w=480;800;1200;1400&format=webp&as=srcset'
import cityTowers from '../assets/stock/city-towers.jpg'
import cityTowersSet from '../assets/stock/city-towers.jpg?w=480;800;1200;1400&format=webp&as=srcset'

export const images = {
  hero: {
    src: heroDusk,
    // The 900w file is a portrait crop for narrow screens.
    srcSet: `${heroDuskSm} 900w, ${heroDuskSet}`,
    alt: 'A contemporary two-storey house at dusk, its glass walls lit from within',
    stock: true,
  },
  villaTerrace: {
    src: villaTerrace,
    srcSet: villaTerraceSet,
    alt: 'White two-storey villa with a covered terrace overlooking a swimming pool',
    stock: true,
  },
  whiteVilla: {
    src: whiteVilla,
    srcSet: whiteVillaSet,
    alt: 'Modern white house with glass balconies and a pool',
    stock: true,
  },
  poolHouse: {
    src: poolHouse,
    srcSet: poolHouseSet,
    alt: 'Contemporary house with large windows beside an infinity pool',
    stock: true,
  },
  timberFacade: {
    src: timberFacade,
    srcSet: timberFacadeSet,
    alt: 'Detached house with a timber-clad upper floor and a landscaped front lawn',
    stock: true,
  },
  courtyardHouse: {
    src: courtyardHouse,
    srcSet: courtyardHouseSet,
    alt: 'Timber and dark-clad house behind a private gated courtyard',
    stock: true,
  },
  livingWarm: {
    src: livingWarm,
    srcSet: livingWarmSet,
    alt: 'Bright living room with leather sofas, plants and tall windows',
    stock: true,
  },
  livingModern: {
    src: livingModern,
    srcSet: livingModernSet,
    alt: 'Modern open-plan living room with a timber feature wall',
    stock: true,
  },
  openPlanStair: {
    src: openPlanStair,
    srcSet: openPlanStairSet,
    alt: 'Open-plan interior with a floating timber staircase and glass doors to the garden',
    stock: true,
  },
  officeInterior: {
    src: officeInterior,
    srcSet: officeInteriorSet,
    alt: 'Clean, modern office corridor with a kitchenette and glass partitions',
    stock: true,
  },
  cityTowers: {
    src: cityTowers,
    srcSet: cityTowersSet,
    alt: 'Glass office towers against a clear blue sky',
    stock: true,
  },
}
