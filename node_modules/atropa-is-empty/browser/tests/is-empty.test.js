describe('is-empty', function () {
    it('returns true for null', function () {
        expect(isEmpty()).toEqual(true);
        expect(isEmpty(null)).toEqual(true);
    });
    it('returns true for undefined', function () {
        expect(isEmpty(undefined)).toEqual(true);
    });
    it('returns true for empty string', function () {
        expect(isEmpty('')).toEqual(true);
        expect(isEmpty(new String(''))).toEqual(true);
    });
    it('returns true for empty Array', function () {
        expect(isEmpty([])).toEqual(true);
        expect(isEmpty(new Array())).toEqual(true);
    });
    it('returns true for empty object', function () {
        expect(isEmpty({})).toEqual(true);
        expect(isEmpty(new Object())).toEqual(true);
        expect(isEmpty(new Object(null))).toEqual(true);
    });
    it('returns false for a non empty string', function () {
        expect(isEmpty('x')).toEqual(false);
    });
    it('returns false for a non empty Array', function () {
        expect(isEmpty([null])).toEqual(false);
        expect(isEmpty([undefined])).toEqual(false);
        expect(isEmpty([''])).toEqual(false);
    });
    it('returns false for a non empty Object', function () {
        expect(isEmpty({ a : 'x'})).toEqual(false);
        expect(isEmpty({ a : undefined})).toEqual(false);
        expect(isEmpty({ a : null})).toEqual(false);
    });
});



