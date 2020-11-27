import { ChangeEvent } from "react";
export declare function useFormrop<S>(initState: S, 
/** if there is any empty value in init state and you want to fill it use this */
fillStateifEmpty?: S): [S, (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void, (key: Partial<S>) => void, (initWith?: Partial<S>) => void];
//# sourceMappingURL=index.d.ts.map