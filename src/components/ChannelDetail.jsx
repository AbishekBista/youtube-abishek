import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material';

import {Videos, ChannelCard} from "./"
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const {id} = useParams();
  console.log(id)

  const[channelDetail, setChannelDetail] = useState(null)
  const[videos, setVideos] = useState(null)

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then(data => setChannelDetail(data?.items[0]))

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then(data => setVideos(data?.items))
  }, [id])

  console.log(channelDetail);
  console.log('Videos inside channel detail: ', videos);
  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'rgb(236,197,182) radial-gradient(circle, rgba(236,197,182,1) 0%, rgba(9,97,121,1) 42%, rgba(0,231,255,1) 100%)',
          zIndex: 10,
          height: '300px'
        }}/>

        <ChannelCard channelDetail={channelDetail} marginTop="-110px"/>
      </Box>
      <Box display="flex" p="2">
        <Box sx={{
                mr: {sm: '100px'}
        }} 
        />
          <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail