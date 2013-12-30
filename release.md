### Return Record and Key, Fixup Required

Iterator must return both record and key.

The fixup is now always required. Procede is a mock iterator that mocks the
Designate or Skip iterator using an array. It is not a general purpose
implementation of an array iterator. Thus, it takes an array of items and
converts them into a record and key pair. This is going to necessitate a
conversion, since each array element is only one object, but the callback for an
invocation of `next` expects two parameters.

### Rename to Advance

And now I realize that I've misspelled proceed. Ugh!
