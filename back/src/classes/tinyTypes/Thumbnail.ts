class Thumbnail {
    constructor(private url: string) {

    }

    // Getter
    public get = (): string => this.url;

    // Setter
    public set(url: string): void {
        this.url = url;
    }
}

export default Thumbnail;