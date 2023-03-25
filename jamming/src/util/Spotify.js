




const clientId = '63ef41099b4240b28a2ede858af21e7d';
const redirectUri = 'http://localhost:3000/';
// const redirectUri ='http://juicy-crate.surge.sh';


// let accessToken;

// const Spotify = {
//   getAccessToken() {
//     if (accessToken) {
//       return accessToken;
//     }
//     //check for access token
//     const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
//     const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

//     if(accessTokenMatch && expiresInMatch) {
//     accessToken = accessTokenMatch[1];
//     const expiresIn = Number(expiresInMatch[1])

//     //This clears the parameters, allowing us to grap a new access token when it expires

//     window.setTimeout(() => accessToken = '', expiresIn * 1000);
//     window.history.pushState('access Token', null, '/')
//     return accessToken;
//     } else {
//         const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
//         window.location= accessUrl;
//     }
//   },
//   search(term) {
//     const accessToken = Spotify.getAccessToken();
//     return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
//     {headers: {
//         Authorization:`Bearer ${accessToken}`
//     }
//     }}.then(response => {
//         return response.json();
//     }).then(jsonResponse => {
//          if (!jsonResponse.tracks) {
//             return [];
//          }
//          return jsonResponse.tracks.items.map(track => ({
//             id: track.id,
//             name: track.name,
//             artist: track.artists[0].name,
//             album: track.album.name,
//             uri: track.uri
//         }));
        
//     });
      
//   },
//   savePlaylist(name, trackUris) {
//     if (!name || !trackUris.length ) {
//         return;
//     }


//     const accessToken = Spotify.getAccessToken();
//     const headers = {Authorization: `Bearer ${accessToken}`};
//     let userId;

//     return fetch('https://api.spotify.com/v1/me', { headers: headers}
//     ).then(response => response.json()
//     ).then(jsonResponse => {
//         userId = jsonResponse.id;
//         return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
//         {
//                 headers: headers,
//                 method: 'POST',
//                 body: JSON.stringify({name: name})

//         }).then(response =>response.json()
//         ).then(jsonResponse => {
//             const playlistId = jsonResponse.id;
//             return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
//             {
//              headers: headers,
//              method: 'POST',
//              body: JSON.stringify({ uris: trackUris})
//         });
//     });
//   });
// }
// };

// export default Spotify;

// const redirectUri = 'http://localhost:3000/';
// const clientId = 'YOUR_CLIENT_ID';

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    //check for access token
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if(accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      //This clears the parameters, allowing us to grab a new access token when it expires
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location= accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artists: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length ) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userId;

    return fetch('https://api.spotify.com/v1/me', { headers: headers }
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ uris: trackUris })
        });
      });
    });
  }
};

export default Spotify;

