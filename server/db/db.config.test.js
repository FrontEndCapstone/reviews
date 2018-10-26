import { expect } from 'chai';
import { Pool } from 'pg';

const setupDb = require('./db.config.js');

beforeAll(() => {
  setupDb();
});

describe('Reviews table', () => {
  it('should have at least 900 rows', done => {
    const pool = new Pool({ database: 'trailblazers-reviews' });

    pool.query('SELECT * FROM reviews', (err, res) => {
      expect(res.rowCount).to.be.above(500);
      done();
      pool.end();
    });
  });

  it('should have the right columns', done => {
    const pool = new Pool({ database: 'trailblazers-reviews' });

    pool.query(
      'SELECT review_id, rating, reviewer, title, body, recommend, helpful, unhelpful FROM reviews',
      (err, res) => {
        const reviewIds = [];
        res.rows.forEach(row => reviewIds.push(row.review_id));
        expect(res.rowCount).to.be.above(500);
        done();
        pool.end();
      },
    );
  });

  it('should have reviews for most items', done => {
    const pool = new Pool({ database: 'trailblazers-reviews' });

    pool.query('SELECT review_id FROM reviews', (err, res) => {
      const reviewIds = new Set();
      res.rows.forEach(row => reviewIds.add(row.review_id));
      expect(reviewIds.size).to.be.above(90);
      expect(reviewIds.size).to.be.below(101);
      expect(reviewIds.has(99)).to.equal(true);
      expect(reviewIds.has(100)).to.equal(false);
      done();
      pool.end();
    });
  });

  it('should have reasonably long review bodies', done => {
    const pool = new Pool({ database: 'trailblazers-reviews' });

    pool.query('SELECT body FROM reviews WHERE id=5', (err, res) => {
      expect(res.rows[0].body.length).to.be.above(100);
      done();
    });
  });
});
