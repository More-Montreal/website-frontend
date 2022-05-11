export type ContentNodes<T> = {
    content: {
        nodes: T[]
    }
}

export type KeyPoint = {
    title: string;
    content: {
        data: { content: string; }
    };
};