//
//  RCTConvert+StorylyInit.m
//  storyly-react-native
//
//  Created by Levent Oral on 12.05.2020.
//

#import "RCTConvert+Storyly.h"

@implementation RCTConvert (StorylyInit)

+ (StorylyInit *)STStorylyInit:(id)json {
    NSDictionary *storylyInitJson = [self NSDictionary:json];
    StorylySegmentation *storylySegmentation = [StorylySegmentation alloc];
    if ([storylyInitJson.allKeys containsObject:@"storylySegments"] &&
        storylyInitJson[@"storylySegments"] != NULL) {
        storylySegmentation = [storylySegmentation initWithSegments:storylyInitJson[@"storylySegments"]];
    }
    
    bool isTestMode = ([storylyInitJson.allKeys containsObject:@"storylyIsTestMode"]) ? [storylyInitJson[@"storylyIsTestMode"] boolValue] : NO;

    StorylyInit *storylyInit = [[StorylyInit alloc] initWithStorylyId:storylyInitJson[@"storylyId"]
                                                         segmentation:storylySegmentation
                                                      customParameter:storylyInitJson[@"customParameter"]
                                                           isTestMode:isTestMode
                                                       storylyPayload:storylyInitJson[@"storylyPayload"]
                                                             userData:storylyInitJson[@"userProperty"]];
    return storylyInit;
}

@end

@implementation RCTConvert (StoryGroupListStyling)

+ (StoryGroupListStyling *)STStoryGroupListStyling:(id)json {
    NSDictionary *storyGroupListStyling = [self NSDictionary:json];
    
    float edgePadding = 4;
    if ([storyGroupListStyling.allKeys containsObject:@"edgePadding"] && storyGroupListStyling[@"edgePadding"] != NULL) {
        edgePadding = [storyGroupListStyling[@"edgePadding"] floatValue];
    }
    
    float paddingBetweenItems = 8;
    if ([storyGroupListStyling.allKeys containsObject:@"paddingBetweenItems"] && storyGroupListStyling[@"paddingBetweenItems"] != NULL) {
        paddingBetweenItems = [storyGroupListStyling[@"paddingBetweenItems"] floatValue];
    }

    return [[StoryGroupListStyling alloc] initWithEdgePadding:edgePadding
                                          paddingBetweenItems:paddingBetweenItems];
}

@end

@implementation RCTConvert (StoryGroupIconStyling)

+ (StoryGroupIconStyling *)STStoryGroupIconStyling:(id)json {
    NSDictionary *storyGroupIconStyling = [self NSDictionary:json];
    
    float height = 80;
    if ([storyGroupIconStyling.allKeys containsObject:@"height"] && storyGroupIconStyling[@"height"] != NULL) {
        height = [storyGroupIconStyling[@"height"] floatValue];
    }
    
    float width = 80;
    if ([storyGroupIconStyling.allKeys containsObject:@"width"] && storyGroupIconStyling[@"width"] != NULL) {
        width = [storyGroupIconStyling[@"width"] floatValue];
    }
    
    float cornerRadius = 40;
    if ([storyGroupIconStyling.allKeys containsObject:@"cornerRadius"] && storyGroupIconStyling[@"cornerRadius"] != NULL) {
        cornerRadius = [storyGroupIconStyling[@"cornerRadius"] floatValue];
    }
    

    return [[StoryGroupIconStyling alloc] initWithHeight:height
                                                   width:width
                                            cornerRadius:cornerRadius];
}

@end

@implementation RCTConvert (StoryGroupTextStyling)

+ (StoryGroupTextStyling *)STStoryGroupTextStyling:(id)json {
    NSDictionary *storyGroupTextStyling = [self NSDictionary:json];
    
    BOOL isVisible = YES;
    if ([storyGroupTextStyling.allKeys containsObject:@"isVisible"] && storyGroupTextStyling[@"isVisible"] != NULL) {
        isVisible = [storyGroupTextStyling[@"isVisible"] boolValue];
    }

    UIColor* textColorSeen = UIColor.blackColor;
    if ([storyGroupTextStyling.allKeys containsObject:@"colorSeen"] && storyGroupTextStyling[@"colorSeen"] != NULL) {
        textColorSeen = [self getUIColorObjectFromHexString:storyGroupTextStyling[@"colorSeen"]];
    } 

    UIColor* textColorNotSeen = UIColor.blackColor;
    if ([storyGroupTextStyling.allKeys containsObject:@"colorNotSeen"] && storyGroupTextStyling[@"colorNotSeen"] != NULL) {
        textColorNotSeen = [self getUIColorObjectFromHexString:storyGroupTextStyling[@"colorNotSeen"]];
    }
    
    int fontSize = 12;
    if ([storyGroupTextStyling.allKeys containsObject:@"textSize"] && storyGroupTextStyling[@"textSize"] != NULL) {
        fontSize = [storyGroupTextStyling[@"textSize"] intValue];
    }
    
    UIFont* font = [UIFont systemFontOfSize: fontSize];
    if ([storyGroupTextStyling.allKeys containsObject:@"typeface"] && storyGroupTextStyling[@"typeface"] != NULL) {
        NSString* typeface = storyGroupTextStyling[@"typeface"];
        NSString* fontName = typeface.stringByDeletingPathExtension;
        UIFont* updateFont = [UIFont fontWithName:fontName size:fontSize];
        if (updateFont != nil) {
            font = updateFont;
        }
    }
    
    int lines = 2;
    if ([storyGroupTextStyling.allKeys containsObject:@"lines"] && storyGroupTextStyling[@"lines"] != NULL) {
        lines = [storyGroupTextStyling[@"lines"] intValue];
    }
    
    return [[StoryGroupTextStyling alloc] initWithIsVisible:isVisible
                                                      colorSeen:textColorSeen
                                                      colorNotSeen:textColorNotSeen
                                                      font:font
                                                      lines:lines];
}

+ (UIColor *)getUIColorObjectFromHexString:(NSString *)hexStr {
    unsigned int hexInt = 0;
    NSString *noHashString = [hexStr stringByReplacingOccurrencesOfString:@"#" withString:@""];
    NSScanner *scanner = [NSScanner scannerWithString:noHashString];
    [scanner setCharactersToBeSkipped:[NSCharacterSet symbolCharacterSet]];
    [scanner scanHexInt:&hexInt];
    
    CGFloat alpha, red, green, blue;
    if ([hexStr length] == 9) {
        alpha = ((hexInt & 0xFF000000) >> 24) / 255.0f;
        red = ((hexInt & 0x00FF0000) >> 16) / 255.0f;
        green = ((hexInt & 0x0000FF00) >> 8) / 255.0f;
        blue = (hexInt & 0x000000FF) / 255.0f;
    } else {
        alpha = 1;
        red = ((hexInt & 0xFF0000) >> 16) / 255.0f;
        green = ((hexInt & 0x00FF00) >>  8) / 255.0f;
        blue = (hexInt & 0x0000FF) / 255.0f;
    }
    return [[UIColor alloc] initWithRed:red
                                  green:green
                                   blue:blue
                                  alpha:alpha];
}

@end

@implementation RCTConvert (StoryHeaderStyling)

+ (StoryHeaderStyling *)STStoryHeaderStyling:(id)json {
    NSDictionary *storyHeaderStyling = [self NSDictionary:json];
    
    BOOL isTextVisible = YES;
    if ([storyHeaderStyling.allKeys containsObject:@"isTextVisible"] && storyHeaderStyling[@"isTextVisible"] != NULL) {
        isTextVisible = [storyHeaderStyling[@"isTextVisible"] boolValue];
    }
    
    BOOL isIconVisible = YES;
    if ([storyHeaderStyling.allKeys containsObject:@"isIconVisible"] && storyHeaderStyling[@"isIconVisible"] != NULL) {
        isIconVisible = [storyHeaderStyling[@"isIconVisible"] boolValue];
    }
    
    BOOL isCloseButtonVisible = YES;
    if ([storyHeaderStyling.allKeys containsObject:@"isCloseButtonVisible"] && storyHeaderStyling[@"isCloseButtonVisible"] != NULL) {
        isCloseButtonVisible = [storyHeaderStyling[@"isCloseButtonVisible"] boolValue];
    }

    UIImage* closeIconImage = NULL;
    if ([storyHeaderStyling.allKeys containsObject:@"closeIcon"] && storyHeaderStyling[@"closeIcon"] != NULL) {
        NSString* closeIcon = storyHeaderStyling[@"closeIcon"];
        closeIconImage = [UIImage imageNamed:closeIcon];
    }

    UIImage* shareIconImage = NULL;
    if ([storyHeaderStyling.allKeys containsObject:@"shareIcon"] && storyHeaderStyling[@"shareIcon"] != NULL) {
        NSString* shareIcon = storyHeaderStyling[@"shareIcon"];
        shareIconImage = [UIImage imageNamed:shareIcon];
    }

    return [[StoryHeaderStyling alloc] initWithIsTextVisible:isTextVisible
                                               isIconVisible:isIconVisible
                                        isCloseButtonVisible:isCloseButtonVisible
                                             closeButtonIcon:closeIconImage
                                             shareButtonIcon:shareIconImage];
}

@end

@implementation RCTConvert (StorylyLayoutDirection)

+ (StorylyLayoutDirection)STStorylyLayoutDirection:(NSString *)direction {
    if ([direction isEqualToString:@"ltr"]) {
        return StorylyLayoutDirectionLTR;
    } else if ([direction isEqualToString:@"rtl"]) {
        return StorylyLayoutDirectionRTL;
    } else {
        return StorylyLayoutDirectionLTR;
    }
}

@end


@implementation RCTConvert (UIFont)
    
+ (UIFont *)STStoryItemTextTypeface:(NSString *)typeface {
    UIFont* font = [UIFont systemFontOfSize:14 weight:UIFontWeightSemibold];
    UIFont* updateFont = [UIFont fontWithName:typeface.stringByDeletingPathExtension size:14];
    if (updateFont != nil) {
        font = updateFont;
    }
    return font;
}
    
+ (UIFont *)STStoryInteractiveTextTypeface:(NSString *)typeface {
    UIFont* font = [UIFont systemFontOfSize:14 weight:UIFontWeightRegular];
    UIFont* updateFont = [UIFont fontWithName:typeface.stringByDeletingPathExtension size:14];
    if (updateFont != nil) {
        font = updateFont;
    }
    return font;
}

@end

