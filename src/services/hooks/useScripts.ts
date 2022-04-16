import { useQuery } from "react-query";
import { api } from "../apiClient";


type Script = {
    id: string;
    script_name: string;
    licensekey: string;
    ipLicense: string;
    email: string;
    createdAt: string;
}

type GetScriptResponse = {
    scripts: Script[];
}

export async function getScripts(email: string): Promise<GetScriptResponse> {
    const { data, headers } = await api.post('user_license', { 
       email: email
    })
    

    const scripts = data.scripts.map(script => {
        return {
            id: script._id,
            script_name: script.script_name,
            licensekey: script.licensekey,
            ipLicense: script.ipLicense,
            createdAt: new Date(script.createdAt).toLocaleDateString("pt-BR", {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            })
        }
    })

    return { 
        scripts: scripts
    };
}

export function useScripts(email: string) {
    return useQuery(['scripts', email], () => getScripts(email), {
        staleTime: 1000 * 60 * 10, // 10 min 
    })
}