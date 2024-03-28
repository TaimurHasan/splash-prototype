export const brandingColors = {
    splashGray: '#1c1c1e',
    splashGreen: '#87E4B7',
    splashGreenbtn: '#67FFB6',
    splashRedbtn: '#FF7967',
};

export const animationConfig = { 
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
    }
};

export const standardHeaderStyling = {
    headerStyle: {
        backgroundColor: brandingColors.splashGray,
    },
    headerTintColor: brandingColors.splashGreen,
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerShadowVisible: false,
};

export const eNotificationType = {
    1: 'join',
}