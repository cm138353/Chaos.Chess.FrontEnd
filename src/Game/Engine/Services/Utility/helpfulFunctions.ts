import _ from "lodash";

export function getSpaceFromRank(fullRank: string, file: number): string {
    let counter = 0;
    for (const space of fullRank) {
        if (_.isFinite(+space)) {
            let number = +space;
            counter += number;
        }
        else
            counter++;

        if (counter >= file)
            return space;
    }
}

export function getFileSpaceIndexFromRank(fullRank: string, file: number): number {
    let counter = 0;
    let index = -1;
    for (const space of fullRank) {
        if (_.isFinite(+space)) {
            let number = +space;
            counter += number;
        }
        else
            counter++;
        index++;
        if (counter >= (file - 96))
            return index;
    }
}

export function getColorOfSpace(coordinates: string) {
    let rank = +coordinates.charAt(coordinates.length - 1);
    let fileCharCode = coordinates.charCodeAt(0);

    if (rank % 2 == 0)
        return (fileCharCode - 96) % 2 == 0 ? "w" : "b";
    else
        return (fileCharCode - 96) % 2 == 0 ? "b" : "w";
}