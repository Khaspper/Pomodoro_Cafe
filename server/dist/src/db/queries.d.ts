export declare function getUserByUsername(username: string): Promise<{
    id: number;
    email: string;
    username: string;
    password: string;
} | null>;
export declare function getUserByEmail(email: string): Promise<{
    id: number;
    email: string;
    username: string;
    password: string;
} | null>;
export declare function getUserById(id: number): Promise<{
    id: number;
    email: string;
    username: string;
} | null>;
export declare function postNewUser({ email, username, password, }: {
    email: string;
    username: string;
    password: string;
}): Promise<unknown>;
export declare function getAllCafes(): Promise<{
    id: number;
    name: string;
    lat: number;
    lon: number;
    type: string | null;
    brand: string | null;
    officialName: string | null;
    spotifyLink: string | null;
}[]>;
export declare function cafeReviews(cafeId: number): Promise<{
    id: number;
    cafeId: number;
    userId: number;
    wifiStrength: number;
    freeWifi: number;
    outlets: number;
    seating: number;
} | null>;
export declare function addSong(spotifyLink: string, cafeId: number): Promise<void>;
export declare function getCafeById(cafeID: number): Promise<boolean>;
export declare function reviewCafe(userId: number, cafeId: number, wifiStrength: number, freeWifi: number, outlets: number, seating: number): Promise<void>;
export declare function createCafeStats(cafeId: number): Promise<void>;
export declare function updateCafeStats(cafeId: number): Promise<void>;
export declare function getCafeStats(cafeID: number): Promise<{
    cafeId: number;
    wifiCount: number | null;
    outletCount: number | null;
    seatingCount: number | null;
    wifiFreeCount: number | null;
} | null>;
export declare function getAvgCafeStats(cafeId: number): Promise<import("../../generated/prisma").Prisma.GetReviewAggregateType<{
    where: {
        cafeId: number;
    };
    _avg: {
        wifiStrength: true;
        freeWifi: true;
        outlets: true;
        seating: true;
    };
}>>;
export declare function getReviewFromUser(cafeId: number, userId: number): Promise<{
    id: number;
    cafeId: number;
    userId: number;
    wifiStrength: number;
    freeWifi: number;
    outlets: number;
    seating: number;
} | null>;
export declare function deleteUsersReview(cafeId: number, userId: number): Promise<void>;
export declare function postNewComment(cafeId: number, userId: number, username: string, message: string): Promise<void>;
export declare function getComments(cafeId: number): Promise<{
    id: number;
    username: string;
    cafeId: number;
    userId: number;
    message: string;
    createdAt: Date;
}[]>;
export declare function updateUsername(oldUsername: string, newUsername: string): Promise<void>;
export declare function updateEmail(oldEmail: string, newEmail: string): Promise<void>;
export declare function updatePassword(userId: number, password: string): Promise<void>;
//# sourceMappingURL=queries.d.ts.map