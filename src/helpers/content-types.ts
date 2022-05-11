export type ContentNodes<T> = {
    content: {
        nodes: T[]
    }
}

export function getFirstNode<C>(data: ContentNodes<C>) {
    return data.content.nodes[0]!;
}

export type KeyPoint = {
    title: string;
    content: {
        data: { content: string; }
    };
};