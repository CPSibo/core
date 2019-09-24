export class PartialTemplate {

    // Available partial template directives.
    protected directives: { [key: string] : (position: number, handle: string, content: string) => void } = {
        '@InsertBelow': this.insertBelow,
        '@InsertAbove': this.insertAbove
    }

    protected text: string

    protected defaultText: string

    constructor(defaultText: string, text: string = null) {
        this.text=  text
        this.defaultText = defaultText
    }

    public static for(defaultTemplate: string, partialTemplate: string): PartialTemplate {
        return new this(
            (<any>window).store.getters.defaultTemplates[defaultTemplate], 
            (<any>window).store.getters.templates[partialTemplate]
        )
    }

    public build(){
        // Concatenate our directive tokens into a string.
        let flattenedDirectiveTokens = Object.keys(this.directives).join('|')

        // Search for strings matching any of our directives.
        //
        // NB: Only one directive is allowed per line and the content
        // must be at least one newline below the directive.
        let regex: string = `(?<directive>${flattenedDirectiveTokens})\('(?<handle>.+?)'\)
            \n+(?<content>.+?)(?=${flattenedDirectiveTokens}|$)`
        
        // Get the first match.
        let match: RegExpMatchArray = RegExp(regex, 'gimys').exec(this.text)

        if (!match) {
            // TODO: Implement
        }

        while (match != null) {
            let directiveFunction = this.directives[match['directive']]

            directiveFunction(match.index, match['handle'], match['content'])

            // Get the next match.
            match = RegExp(regex, 'gimys').exec(this.text);
        }
    }

    private insertBelow(position: number, handle: string, content: string){
        // Replace any whitespace characters in the handle with
        // whitespace regex tokens to enable more relaxed matching.
        let regex: string = handle.replace(new RegExp('\\s+', 'g'), '\\s+')


    }

    private insertAbove(position: number, handle: string, content: string){

    }

}
