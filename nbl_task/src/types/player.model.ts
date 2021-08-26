export interface Player {
    id: number;
    first_name: string;
    height_feet?: any;
    height_inches?: any;
    last_name: string;
    position: string;
    team: Team;
    weight_pounds?: any;
}

type Team = {
    id: number;
    abbreviation: string; 
    city: string; 
    conference: string; 
    division: string; 
    full_name: string; 
    name: string;
}

export interface PlayerStatsPerSeason {
    [key: string]: any;
}