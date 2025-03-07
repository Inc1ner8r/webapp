import React, {useEffect, useState} from 'react';
import axios from 'axios';

const AssetDesc = ({uri}) => {

    const [response,setResponse] = useState([]);

    const metadata = async()=>{
        const { data } = await axios.get(
            `https://cloudflare-ipfs.com/ipfs/${uri}`
        );
        setResponse(data);
    }

    useEffect(() => {
        metadata();
      },[uri]);

    return (
        <div style={{minHeight:26}}>
            <div className="text-sm font-bold text-gray-500 font-1 dark:text-gray-300">{response && response.name}</div>
        </div>
    )
}

export default AssetDesc;