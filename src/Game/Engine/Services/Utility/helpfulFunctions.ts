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