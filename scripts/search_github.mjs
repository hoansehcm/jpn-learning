export async function searchGithubKanjiVietnamese() {
    const query = encodeURIComponent('kanji "Hán Việt" extension:json');
    const url = `https://api.github.com/search/code?q=${query}&per_page=1`;

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Node.js-Kanji-Search-Agent'
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const item = data.items[0];
            // Constructing raw GitHub user content URL
            const rawUrl = `https://raw.githubusercontent.com/${item.repository.full_name}/master/${item.path}`;
            console.log('Found Raw URL:', rawUrl);
            console.log('Original HTML URL:', item.html_url);
            return rawUrl;
        } else {
            console.log('No matching JSON files found.');
            return null;
        }
    } catch (error) {
        console.error('Failed to search GitHub:', error);
    }
}

searchGithubKanjiVietnamese();
