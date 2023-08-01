export declare const CustomExceptions: {
    USER_NOT_FOUND: {
        statusCode: number;
        message: string;
        result: {
            fcmTokens: string;
        };
    };
    EMAIL_ALREADY_EXISTS: {
        statusCode: number;
        message: string;
        result: {
            userIdx: string;
        };
    };
    NICKNAME_ALREADY_EXISTS: {
        statusCode: number;
        message: string;
        result: {
            userIdx: string;
        };
    };
    PHONE_ALREADY_EXISTS: {
        statusCode: number;
        message: string;
        result: {
            userIdx: string;
        };
    };
    FCMTOKEN_NOT_FOUND: {
        statusCode: number;
        message: string;
        result: {
            fcmTokens: {};
        };
    };
    EXCEED_CONTENT_LENGTH: {
        statusCode: number;
        message: string;
        result: {
            userIdx: any;
            category: string;
            title: string;
            content: string;
            likeNum: any;
            viewNum: any;
            postIdx: any;
            createAt: string;
            updatedAt: string;
            nickName: string;
            imagePath: any[];
            commentList: any[];
        };
    };
    USER_POSTS_NOT_FOUND: {
        statusCode: number;
        message: string;
        result: {
            userIdx: any;
            category: string;
            title: string;
            content: string;
            likeNum: any;
            viewNum: any;
            postIdx: any;
            createAt: string;
            updatedAt: string;
            nickName: string;
            imagePath: any[];
            commentList: any[];
        }[];
    };
    CATEGORY_POSTS_NOT_FOUND: {
        statusCode: number;
        message: string;
        result: {
            userIdx: any;
            category: string;
            title: string;
            content: string;
            likeNum: any;
            viewNum: any;
            postIdx: any;
            createAt: string;
            updatedAt: string;
            nickName: string;
            imagePath: any[];
            commentList: any[];
        }[];
    };
    MAX_POSTS_EXCEEDED: {
        statusCode: number;
        message: string;
        result: {
            userIdx: any;
            category: string;
            title: string;
            content: string;
            likeNum: any;
            viewNum: any;
            postIdx: any;
            createAt: string;
            updatedAt: string;
            nickName: string;
            imagePath: any[];
            commentList: any[];
        }[];
    };
    POST_NOT_FOUND: {
        statusCode: number;
        message: string;
        result: {
            userIdx: any;
            category: string;
            title: string;
            content: string;
            likeNum: any;
            viewNum: any;
            postIdx: any;
            createAt: string;
            updatedAt: string;
            nickName: string;
            imagePath: any[];
            commentList: any[];
        };
    };
    LIKE_NOT_FOUND: {
        statusCode: number;
        message: string;
        result: {
            userIdx: any;
            category: string;
            title: string;
            content: string;
            likeNum: any;
            viewNum: any;
            postIdx: any;
            createAt: string;
            updatedAt: string;
            nickName: string;
            imagePath: any[];
            commentList: any[];
        };
    };
    NOT_FOUNT_POST: {
        statusCode: number;
        message: string;
        result: {
            commentIdx: any;
            postIdx: any;
            userIdx: any;
            parentCommentIdx: any;
            depth: any;
            commentAt: string;
            commentContent: string;
            isDeleted: any;
        };
    };
    NOT_FOUND_COMMENT: {
        statusCode: number;
        message: string;
        result: {
            commentIdx: any;
            postIdx: any;
            userIdx: any;
            parentCommentIdx: any;
            depth: any;
            commentAt: string;
            commentContent: string;
            isDeleted: any;
        }[];
    };
};
