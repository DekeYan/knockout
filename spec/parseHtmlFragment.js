describe('Parse HTML fragment', function() {
    beforeEach(jasmine.prepareTestNode);

    ko.utils.arrayForEach(
    [
        { html: '<tr-component></tr-component>', parsed: ['<tr-component></tr-component>'] },
        { html: '<thead><tr><th><thcomponent>hello</thcomponent></th></tr></thead>', parsed: ['<thead><tr><th><thcomponent>hello</thcomponent></th></tr></thead>'] },
        { html: '<tbody-component>world</tbody-component>', parsed: ['<tbody-component>world</tbody-component>'] },
        { html: '<tfoot-component>foo</tfoot-component>', parsed: ['<tfoot-component>foo</tfoot-component>'] },
        { html: '<div></div>', parsed: ['<div></div>'] },
        { html: '<custom-component></custom-component>', parsed: ['<custom-component></custom-component>'] },
        { html: '<tr></tr>', parsed: ['<tr></tr>'] },
        { html: '<tr></tr><tr></tr>', parsed: ['<tr></tr>', '<tr></tr>'] },
        { html: '<td></td>', parsed: ['<td></td>'] },
        { html: '<th></th>', parsed: ['<th></th>'] },
        { html: '<tbody></tbody>', parsed: ['<tbody></tbody>'] },
        { html: '<table><tbody></tbody></table>', parsed: ['<table><tbody></tbody></table>'] },
        { html: '<div></div><div></div>', parsed: ['<div></div>', '<div></div>'] },
        { html: '<optgroup label="x"><option>text</option></optgroup>', parsedChoices: [ [ '<optgroup label="x"><option>text</option></optgroup>' ], [ '<optgroup label=x><option selected>text</option></optgroup>' ] ] },
        { html: '<option>text</option>', parsedChoices: [ [ '<option>text</option>' ], [ '<option selected>text</option>' ] ] }
    ], function (data) {
        it('should parse ' + data.html + ' correctly', function () {
            var parsedNodes = ko.utils.parseHtmlFragment(data.html, document);

            if (jasmine.ieVersion <= 8 && parsedNodes.length > 1 && data.parsed && data.parsed.length == 1) {
                ko.utils.arrayForEach(parsedNodes, function (node) {
                    testNode.appendChild(node);
                });
                expect(testNode).toContainHtml(data.parsed[0]);
            } else {
                var parsedStrings = ko.utils.arrayMap(parsedNodes, function (node) {
                    return node.outerHTML && node.outerHTML.toLowerCase().replace(/\r\n/g, "");
                });
                if (data.parsedChoices) {
                    expect(parsedStrings).toEqualOneOf(data.parsedChoices);
                } else {
                    expect(parsedStrings).toEqual(data.parsed);
                }
            }
        });
    });
});
