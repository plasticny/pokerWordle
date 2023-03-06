function Poker(face, rank) {
    this.face = face; // string
    this.rank = rank; // string
    this.toString = () => { return face+rank; }
}
module.exports = Poker;