declare module "storyly-react-native" {
  import { Component } from "react";
  import { ViewProps } from "react-native";

  export namespace Storyly {
    export interface Props extends ViewProps {
      storylyId: string;
      customParameter?: string;
      storylyTestMode?: boolean;
      storylySegments?: string[];
      storylyUserProperty?: Record<string, string>;
      storylyPayload?: string;
      storylyShareUrl?: string;

      storyGroupSize?: "small" | "large" | "custom";
      storyGroupIconWidth?: number;
      storyGroupIconHeight?: number;
      storyGroupIconCornerRadius?: number;
      storyGroupIconBackgroundColor?: string;
      storyGroupIconBorderColorSeen?: string[];
      storyGroupIconBorderColorNotSeen?: string[];

      storyGroupTextSize?: number;
      storyGroupTextLines?: number;
      storyGroupTextColorSeen?: string;
      storyGroupTextColorNotSeen?: string;
      storyGroupTextIsVisible?: boolean;
      storyGroupTextTypeface?: string;
      storyGroupPinIconColor?: string;

      storyGroupListEdgePadding?: number;
      storyGroupListPaddingBetweenItems?: number;

      storyItemTextColor?: string;
      storyItemIconBorderColor?: string[];
      storyItemProgressBarColor?: string[];
      storyItemTextTypeface?: string;
      storyInteractiveTextTypeface?: string;

      storyHeaderIconIsVisible?: boolean;
      storyHeaderTextIsVisible?: boolean;
      storyHeaderCloseButtonIsVisible?: boolean;
      storyHeaderCloseIcon?: string,
      storyHeaderShareIcon?: string,

      storylyLayoutDirection?: "ltr" | "rtl";

      onLoad?: (event: StoryLoadEvent) => void;
      onFail?: (event: String) => void;
      onStoryOpen?: () => void;
      onStoryClose?: () => void;
      onEvent?: (event: StoryEvent) => void;
      onPress?: (event: StoryPressEvent) => void;
      onUserInteracted?: (event: StoryInteractiveEvent) => void;
    }

    export interface StoryLoadEvent {
      storyGroupList: StoryGroup[];
      dataSource: string;
    }

    export interface StoryFailEvent {
      errorMessage: string;
    }

    export interface StoryPressEvent {
      story: Story;
    }

    export interface StoryEvent {
      event: string;
      story?: Story;
      storyGroup?: StoryGroup;
      storyComponent?: StoryComponent;
    }

    export interface StoryComponent {
      id: string;
      type: ReactionType;
    }

    export interface StoryQuizComponent extends StoryComponent {
      title: string;
      options: string[];
      rightAnswerIndex?: number;
      selectedOptionIndex: number;
      customPayload?: string;
    }

    export interface StoryPollComponent extends StoryComponent {
      title: string;
      emojiCodes: string[];
      selectedEmojiIndex: number;
      customPayload?: string;
    }

    export interface StoryRatingComponent extends StoryComponent {
      title: string;
      emojiCodes: string[];
      selectedEmojiIndex: number;
      customPayload?: string;
    }

    export interface StoryPromoCodeComponent extends StoryComponent {
      text: string;
    }

    export interface StoryCommentComponent extends StoryComponent {
      text: string;
    }

    export interface StoryInteractiveEvent {
      story: Story;
      storyGroup: StoryGroup;
      storyComponent: StoryComponent;
    }

    export interface StoryGroup {
      id: string;
      title: string;
      index: number;
      seen: boolean;
      iconUrl: string;
      stories: Story[];
    }

    export interface Story {
      id: string;
      title: string;
      name: string;
      index: number;
      seen: boolean;
      currentTime: number;
      media: {
        type: number;
        storyComponentList?: StoryComponent[];
        actionUrl?: string;
        actionUrlList?: string[];
        previewUrl?: string;
      };
    }

    export type ReactionType =
      | "emoji"
      | "rating"
      | "poll"
      | "quiz"
      | "countdown"
      | "promocode"
      | "swipeaction"
      | "buttonaction"
      | "text"
      | "image"
      | "producttag"
      | "comment"
      | "video"
      | "vod";
  }

  export type ExternalData = Record<string, string>[];

  export class Storyly extends Component<Storyly.Props> {
    open: () => void;
    close: () => void;
    refresh: () => void;
    openStory: (storyUriFromTheDashboard: string) => void;
    setExternalData: (externalData: ExternalData) => void;
    openStoryWithId: (storyGroupId: string, storyId: string) => void;
  }
}
