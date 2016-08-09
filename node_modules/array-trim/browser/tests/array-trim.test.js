describe('array-trim', function () {
    it('removes undefined', function () {
        expect(arrayTrim(['s', undefined, 'd'])).toEqual(['s', 'd']);
    });
    it('removes null', function () {
        expect(arrayTrim(['s', null, 'd'])).toEqual(['s', 'd']);
    });
    it('removes empty string', function () {
        expect(arrayTrim(['s', '', 'd'])).toEqual(['s', 'd']);
    });
});



