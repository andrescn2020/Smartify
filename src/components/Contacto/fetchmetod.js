const sitioUrl = 'https://back2demo2-production.up.railway.app';
export const fetchstoken = async (endpoint, data, method = 'GET') =>{
    const url = `${ sitioUrl }/${ endpoint }`;

          if ( method === 'GET' ) {
            const resp = await fetch( url );
            return await resp.json();
          } else {
            const resp = await fetch( url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                    
                },
                body: JSON.stringify( data )
            })
            return await resp.json();
          }
}