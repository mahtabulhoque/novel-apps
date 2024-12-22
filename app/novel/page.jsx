import FirstNovel from '@/components/Novels/FirstNovel';
import React from 'react';

async function fetchNovels() {
    try {
        const res = await fetch('http://localhost:3000/api/novel', {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("Fetch error: ", res.statusText);
            throw new Error("Failed to fetch data from /api/novel");
        }

        return res.json();
    } catch (error) {
        console.error("An error occurred while fetching novels:", error);
        return [];
    }
}

const Novel = async () => {

    const novels = await fetchNovels();
    console.log(novels);

    const firstNovel = novels && novels[0];
    return (
        <div>

            {
                novels?.length > 0 ? (
                    <>
                      <FirstNovel firstNovel={firstNovel}/>
                    
                    </>
                ):(

                    <h3>No chapter....</h3>
                )
            }
            
        </div>
    );
};

export default Novel;