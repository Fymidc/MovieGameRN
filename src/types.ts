
export interface Results {
    results:Result[]
  }

  export interface Result{
    key:string
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number | undefined
    vote_count: number
  }
  //detail types

  export interface Details {
    results:Detail[]
  }

  export interface Detail {
    key:string
    adult: boolean
    backdrop_path: string
    belongs_to_collection: BelongsToCollection
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number | undefined
    vote_count: number
    videos: Videos
  }
  
  export interface BelongsToCollection {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  
  export interface Genre {
    id: number
    name: string
  }
  
  export interface ProductionCompany {
    id: number
    logo_path?: string
    name: string
    origin_country: string
  }
  
  export interface ProductionCountry {
    iso_3166_1: string
    name: string
  }
  
  export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
  }
  
  export interface Videos {
    results: VideoResult[]
  }
  
  export interface VideoResult {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
  }

  //navigation types

  export type HomeStackParamList ={
    HomeS : undefined
    
  }

  export type ProfileStackParamList ={
    ProfileS : undefined
  }

 
  export type TabStackParamList ={
    HomeTab : undefined
    ProfileTab : undefined
    GameTab : undefined
    Settings : undefined
  }

  export type StackParamList ={
    Home: undefined
    Profile: undefined
    Game: undefined
    Detail: { item: Result }
    
    
  }
