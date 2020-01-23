// mocha server/db/models/recipie.spec.js

const {expect} = require('chai')
const db = require('../index')
const Recipe = db.model('recipe')

describe('Recipe model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
    describe('correct creation', () => {
      let recipie1

      beforeEach(async () => {
        recipie1 = await Recipe.create({
          name: 'Onion and mushrooms omelette',
          description:
            'Crack the eggs into a bowl and add a pinch of salt. Whisk until well beaten, then set aside. Sauté the onion until soft and translucent, about 3 to 5 minutes. Add the mushrooms and sauté until they release their juices and become soft, about 3 minutes more. Transfer the onions and mushrooms to bowl and set aside.Pour in the beaten eggs. When the edges begin to set, run a silicone or rubber spatula around the circumference, pushing the edge aside slightly, and tilting the pan to let any uncooked egg run under the omelet. When the surface of the egg is almost entirely set, top one side of the omelet with the reserved sautéed mushrooms and onions. Sprinkle evenly with cheese, if using. Use a spatula to carefully fold the other side of the omelet over the filling. Gently flip the stuffed omelet and cook for another minute, until the cheese melts and the egg is set. Transfer to a plate and garnish with freshly snipped chives, if desired. Serve immediately.',
          imageURL:
            'https://www.seriouseats.com/recipes/images/2016/04/20160418-american-omelet-ham-and-cheese-21-1500x1125.jpg'
        })
      })

      it('expects name to be a string ', () => {
        expect(typeof recipie1.name).to.be.equal('string')
      })

      it('expects name to be equal to Onion and mushrooms omelette', () => {
        expect(recipie1.name).to.be.equal('Onion and mushrooms omelette')
      })

      it('expects description to be a string ', () => {
        expect(typeof recipie1.description).to.be.equal('string')
      })

      it('expects imageURL', () => {
        expect(typeof recipie1.imageURL).to.be.equal('string')
      })

    })
})
