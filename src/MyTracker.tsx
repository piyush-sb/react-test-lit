import  { useEffect , useState, useRef} from 'react';
import axios from 'axios';
export default function MyTracker () {
    const [token,setToken] = useState('PiyushergfsfGupta');
        const knitRef = useRef(null);
        const fetchKnitToken=()=> {
            console.log('Knit token called')
   axios.get(`auth.session.create`).then(res=> {
    setToken(res.data.token);
})        }

        // useEffect(()=> {
        //     (knitRef.current as any).addEventListener('refreshKnitCall',(e : CustomEvent)=> {
        //         fetchKnitToken();
        //     }, false);
        //     (knitRef.current as any).addEventListener('onSuccess',(e : CustomEvent)=> {
        //         fetchKnitToken();
        //     }, false);

        //     return ()=> {
        //         (knitRef.current as any).removeListener('refreshKnitCall');
        //         (knitRef.current as any).removeListener('onSuccess');
        //     }
        // },[])
        return (
            <knit-auth ref={knitRef} knitKey={token} onRefeshKnit={JSON.stringify(fetchKnitToken)}><button slot="initiator">Click me</button> </knit-auth>
        )
    }
