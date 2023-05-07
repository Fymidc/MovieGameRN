
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
    vote_average: number
    vote_count: number
  }

  //navigation types

  export type HomeStackParamList ={
    HomeS : undefined
    
  }

  export type ProfileStackParamList ={
    ProfileS : undefined
  }

  export type GameStackParamList ={
    GameS : undefined
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
