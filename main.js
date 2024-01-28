import {v2 as cloudinary} from 'https://esm.sh/cloudinary';


Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 200,
            headers: {
                "access-control-allow-origin": "*",
                "access-control-allow-methods": "POST",
                "access-control-allow-headers": "Content-Type",
            },
        })
    }
    if (req.method === 'POST') {
        
        const parsed_body = await req.json()
        console.log('json:', parsed_body)


        const cld_name = Deno.env.get('CLD_NAME')
        const cld_api_key = Deno.env.get('CLD_API_KEY')
        const cld_api_sec = Deno.env.get('CLD_API_SEC')
            
        cloudinary.config({ 
            cloud_name: cld_name, 
            api_key: cld_api_key, 
            api_secret: cld_api_sec 
        })

        const content = parsed_body.image
        const fileName = 'camapp_'+ Date.now() + '_v1'

        const res = await cloudinary.uploader.upload(content, { 
                public_id: fileName,
                folder: 'test28Jan' 
        }, (error, result) => { 
            if(error){
                console.error(error)
                return error
            } 
            else {
                console.log(result)
                return result
            }
        })



        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                "content-type": "application/json",
                "access-control-allow-origin": "*"
            },
        })

    }
    else {
        return new Response(JSON.stringify({ message: 'success' }), {
            status: 200,
            headers: {
                "content-type": "application/json",
                "access-control-allow-origin": "*"
            },
        })
    }

})
