import { useQuery } from "@apollo/client";
import { GET_FEATURED_PLAYLISTS } from "../../utils/queries";
import './FeaturedPlaylists.css';

const FeaturedPlaylists = () => {
    const {loading, error, data} = useQuery(GET_FEATURED_PLAYLISTS);
    if(loading) return <p>Loading</p>
    if(error) return <p>Error: {error.message}</p>

    return (
        <div>
            <h2>Featured Playlists</h2>
            <ul>
                {data.FeaturedPlaylists.map((playlist) =>(
                    <li key={playlist.id}>
                        <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                            {playlist.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeaturedPlaylists;