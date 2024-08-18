import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            spotify {           
                access_token
                refresh_token
                expires_in
                playlists {
                    id
                    name
                }
                top_tracks {
                    id
                    name
                    artist
                    album
                    preview_url
                }
           }      
        }
    }
`;

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            spotify {
                access_token
                refresh_token
                expires_in
                playlists {
                    id
                    name
                }
                top_tracks {
                    id
                    name
                    artist
                    album
                    preview_url
                }
            }
        }
    }
`;

export const GET_FEATURED_PLAYLISTS = gql`
    query GetFeaturedPlaylists {
       featuredPlaylists {
        id
        name
        external_urls {
            spotify
        }
       }     
    }
`;

