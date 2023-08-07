import React, {
    useState,
    useEffect,
    useRef
} from 'react'

import { Image } from 'react-native'

const CustomImage = (props) => {
    const [scalableWidth, setScalableWidth] = useState(null)
    const [scalableHeight, setScalableHeight] = useState(null)
    const [image, setImage] = useState(null)

    Image.getSize(
        props.source,
        (width, height) => adjustSize(width, height, props),
        console.err
    )

    function adjustSize(sourceWidth, sourceHeight)  {
        let ratio = 150/sourceWidth

        const computedWidth = sourceWidth * ratio
        const computedHeight = sourceHeight * ratio

        setScalableWidth(computedWidth)
        setScalableHeight(computedHeight)
    }

    useEffect(() => {
        setImage(
            <Image
                style={{
                    width: scalableWidth,
                    height: scalableHeight
                }}
                source = {{uri:props.source}}
            />
        );
    }, [scalableHeight, scalableWidth])

    return image
}

export default CustomImage