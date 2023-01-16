export class MapperService {

    public static map(from: any, to: any) {
        if (from) {
            for (var property in from) {
                if (from.hasOwnProperty(property))
                    (<any>to)[property] = (<any>from)[property];
            }
        }
    }
}