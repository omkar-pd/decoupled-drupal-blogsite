import axios from 'axios';
import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom';

export default function DetailedBlog(props) {
    const { id } = useParams();
    useEffect(() => {
        // eslint-disable-next-line
        fetchPost(id);
      }, []);
    
      const fetchPost = async (id) => {
        try {
          const res = await axios.get(`/jsonapi/node/article/${id}`);
          // const res = await axios.get(`http://decoupled-drupal.co/jsonapi/node/article/`,{mode:'no-cors'});
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      };
  return (
<div>{id}</div>
  )
}
