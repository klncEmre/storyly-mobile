import React, { Component } from 'react';
import { requireNativeComponent,
    UIManager,
    findNodeHandle,
    processColor} from 'react-native';
import { string, arrayOf, func, number, bool, object } from 'prop-types';

class Storyly extends Component {
    refresh = () => {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this._storylyView),
            UIManager.getViewManagerConfig('STStoryly').Commands.refresh,
            [],
        );
    };

    open = () => {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this._storylyView),
            UIManager.getViewManagerConfig('STStoryly').Commands.open,
            [],
        );
    };


    close = () => {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this._storylyView),
            UIManager.getViewManagerConfig('STStoryly').Commands.close,
            [],
        );
    };

    openStory = (payload) => {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this._storylyView),
            UIManager.getViewManagerConfig('STStoryly').Commands.openStory,
            [payload],
        );
    };

    openStoryWithId = (storyGroupId, storyId) => {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this._storylyView),
            UIManager.getViewManagerConfig('STStoryly').Commands.openStoryWithId,
            [storyGroupId, storyId],
        );
    };

    setExternalData = (externalData) => {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this._storylyView),
            UIManager.getViewManagerConfig('STStoryly').Commands.setExternalData,
            [externalData],
        );
    }

    _onStorylyLoaded = (eventPayload) => {
        if (this.props.onLoad) {
            this.props.onLoad(eventPayload.nativeEvent);
        }
    }

    _onStorylyLoadFailed = (eventPayload) => {
        if (this.props.onFail) {
            this.props.onFail(eventPayload.nativeEvent);
        }
    }

    _onStorylyEvent = (eventPayload) => {
        if (this.props.onEvent) {
            this.props.onEvent(eventPayload.nativeEvent);
        }
    }

    _onStorylyActionClicked = (eventPayload) => {
        if (this.props.onPress) {
            this.props.onPress(eventPayload.nativeEvent);
        }
    }

    _onStorylyUserInteracted = (eventPayload) => {
        if (this.props.onUserInteracted) {
            this.props.onUserInteracted(eventPayload.nativeEvent);
        }
    }

    render() {
        const {
            storylyId,
            storylySegments,
            storylyUserProperty,
            customParameter,
            storylyPayload,
            storylyTestMode,
            storyGroupIconBorderColorSeen,
            storyGroupIconBorderColorNotSeen,
            storyItemIconBorderColor,
            storyItemProgressBarColor,
            storyItemTextTypeface,
            storyInteractiveTextTypeface,
            storyGroupIconHeight,
            storyGroupIconWidth,
            storyGroupIconCornerRadius,
            storyGroupListEdgePadding,
            storyGroupListPaddingBetweenItems,
            storyGroupTextIsVisible,
            storyGroupTextTypeface,
            storyGroupTextSize,
            storyGroupTextLines,
            storyGroupTextColorSeen,
            storyGroupTextColorNotSeen,
            storyHeaderTextIsVisible,
            storyHeaderIconIsVisible,
            storyHeaderCloseButtonIsVisible,
            storyHeaderCloseIcon,
            storyHeaderShareIcon,
            onLoad,
            onFail,
            onEvent,
            onPress,
            onStoryOpen,
            onStoryOpenFailed,
            onStoryClose,
            onUserInteracted,
            ...otherProps
        } = this.props;
        return (
            <STStoryly
                {...otherProps}
                storylyInit={{'storylyId': storylyId, 'storylySegments': storylySegments, 'userProperty': storylyUserProperty, 'customParameter': customParameter, 'storylyPayload': storylyPayload, 'storylyIsTestMode': storylyTestMode}}
                storyGroupIconStyling={{'height': storyGroupIconHeight, 'width': storyGroupIconWidth, 'cornerRadius': storyGroupIconCornerRadius}}
                storyGroupListStyling={{'edgePadding': storyGroupListEdgePadding, 'paddingBetweenItems': storyGroupListPaddingBetweenItems}}
                storyGroupTextStyling={{'isVisible': storyGroupTextIsVisible, 'typeface': storyGroupTextTypeface, 'textSize': storyGroupTextSize, 'lines': storyGroupTextLines,'colorSeen': storyGroupTextColorSeen,'colorNotSeen': storyGroupTextColorNotSeen}}
                storyHeaderStyling={{'isTextVisible': storyHeaderTextIsVisible, 'isIconVisible': storyHeaderIconIsVisible, 'isCloseButtonVisible': storyHeaderCloseButtonIsVisible, 'closeIcon': storyHeaderCloseIcon, 'shareIcon': storyHeaderShareIcon}}
                onStorylyLoaded={this._onStorylyLoaded}
                onStorylyLoadFailed={this._onStorylyLoadFailed}
                onStorylyEvent={this._onStorylyEvent}
                onStorylyActionClicked={this._onStorylyActionClicked}
                onStorylyStoryPresented={onStoryOpen}
                onStorylyStoryPresentFailed={onStoryOpenFailed}
                onStorylyStoryDismissed={onStoryClose}
                onStorylyUserInteracted={this._onStorylyUserInteracted}
                storyGroupIconBorderColorSeen={storyGroupIconBorderColorSeen ? storyGroupIconBorderColorSeen.map(processColor) : null}
                storyGroupIconBorderColorNotSeen={storyGroupIconBorderColorNotSeen ? storyGroupIconBorderColorNotSeen.map(processColor) : null}
                storyItemIconBorderColor={storyItemIconBorderColor ? storyItemIconBorderColor.map(processColor) : null}
                storyItemProgressBarColor={storyItemProgressBarColor ? storyItemProgressBarColor.map(processColor) : null}
                storyItemTextTypeface={storyItemTextTypeface}
                storyInteractiveTextTypeface={storyInteractiveTextTypeface}
                ref={el => (this._storylyView = el)}/>
        )
    }
}

Storyly.propTypes = {
    storylyId: string.isRequired,
    storylySegments: arrayOf(string),
    storylyUserProperty: object,
    storylyShareUrl: string,
    customParameter: string,
    storylyTestMode: bool,
    storylyPayload: string,
    
    storyGroupIconBorderColorSeen: arrayOf(string),
    storyGroupIconBorderColorNotSeen: arrayOf(string),
    storyGroupIconBackgroundColor: string,
    storyGroupTextIsVisible: bool,
    storyGroupTextTypeface: string,
    storyGroupTextSize: number,
    storyGroupTextLines: number,
    storyGroupTextColorSeen: string,
    storyGroupTextColorNotSeen: string,
    storyGroupPinIconColor: string,
    storyGroupSize: string,
    storyItemIconBorderColor: arrayOf(string),
    storyItemTextColor: string,
    storyItemProgressBarColor: arrayOf(string),
    storyItemTextTypeface: string,
    storyInteractiveTextTypeface: string,
    storyGroupIconHeight: number,
    storyGroupIconWidth: number,
    storyGroupIconCornerRadius: number,
    storyGroupListEdgePadding: number,
    storyGroupListPaddingBetweenItems: number,
    storyHeaderTextIsVisible: bool,
    storyHeaderIconIsVisible: bool,
    storyHeaderCloseButtonIsVisible: bool,
    storyHeaderCloseIcon: string,
    storyHeaderShareIcon: string,
    storylyLayoutDirection: string,

    onLoad: func,
    onFail: func,
    onPress: func,
    onEvent: func,
    onStoryOpen: func,
    onStoryOpenFailed: func,
    onStoryClose: func,
    onUserInteracted: func
}

const STStoryly = requireNativeComponent('STStoryly', null);

export default Storyly;
