import { Image, View } from 'react-native';
import * as Progress from 'react-native-progress';

export default Loading = () => {
    return (
        <View 
            className='h-full bg-black flex justify-center items-center'
            style={{ alignItems: 'center' }}
        >
            <Image className='mb-10 mr-3' source={require('../../assets/images/logo.png')} />
            <Progress.Bar color={'#67FFB6'} indeterminate={true} width={200} />
        </View>
    )
};