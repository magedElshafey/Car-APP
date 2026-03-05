// import { PaginatedResponse } from "@/types/Response";

// export const getNextPage = <T>(response: PaginatedResponse<T>): number | undefined => {
//     const { current_page, last_page } = response.meta;

//     if (current_page < last_page) {
//         return current_page + 1;
//     }

//     return undefined;
// };

// export default getNextPage;

import type { PaginatedResponse } from "@/types/Response";

const getNextPage = <T>(
    lastPage: PaginatedResponse<T>
): number | undefined => {
    const { current_page, last_page } = lastPage.meta;

    if (current_page < last_page) {
        return current_page + 1;
    }

    return undefined;
};

export default getNextPage;
