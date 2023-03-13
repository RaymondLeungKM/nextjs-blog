import {
  Box,
  Center,
  color,
  Flex,
  Heading,
  Highlight,
  Image,
  List,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";

export default function Coffee() {
  return (
    <>
      <Center
        flexDirection="column"
        justifyContent="space-evenly"
        className="mt-8 md:mt-0"
      >
        <Heading lineHeight="tall" align="center" className="mb-8 md:mb-4">
          <Highlight
            query={["mature", "black"]}
            styles={{ px: "2", py: "1", rounded: "full", bg: "teal.100" }}
          >
            Mature is when you started to enjoy the taste of black coffee..
          </Highlight>
        </Heading>
        <Image
          className="w-[80vw] md:w-[50vw]"
          src="/static/images/coffee-laptop.jpg"
          mx="auto"
          borderRadius="10"
        ></Image>
        <Text fontSize="xl" className="mt-8">
          When you first started drinking coffee, 99.9% of the time you would go
          for a milk coffee such as cappucino/latte/mocha. There's absolutely
          normal as starters usually find coffee to be bitter and unenjoyable on
          its own. But with the addition of a bit of milk and chocolate (or
          sometimes even sugar), coffee would actually become a tasty beverage.
          (Yeah I know, even better with those crazily artistic and pretty
          looking latte art)
          <br />
          <br />
          However, with these addition, coffee literally became a
          coffee-flavoured beverage, instead of really coffee. It would be much
          harder for you to taste the original flavours of the coffee bean
          itself.
          <br />
          <br />
          As you gradually turn your coffee drinking habbit into a hobby, you
          tend to come to the conclusion and decision that you would only drink
          black coffee from then on.
        </Text>
      </Center>
      <Center flexDirection="column" justifyContent="space-evenly" className="md:h-[100vh]">
        <Image
          src="/static/images/black-coffee.avif"
          h="60vh"
          mx="auto"
          my="8"
          borderRadius="10"
        ></Image>
        <Text fontSize="xl">
          In general, the flavor of coffee beans can be classified as two main
          categories: Fruity or Nutty. Fruity coffee is usually prepared with a
          lighter raost while nutty coffee comes with a darker roast. As a
          result, the flavor of the fruity coffee (as can be easily inferred
          from its name) is more fruity / floral and with a cleaner palette. On
          the other hand, nutty coffee would taste more toasty with hints of
          chocolate,almond and sometimes vanilla.
        </Text>
      </Center>
      <Flex className="flex-col md:flex-row">
        <Image
          src="/static/images/fruity_coffee.jpg"
          className="w-[80vw] md:w-[30vw]"
          mx="auto"
          my="8"
          borderRadius="10"
        ></Image>
        <Image
          src="/static/images/nutty_coffee.jpg"
          className="w-[80vw] md:w-[30vw]"
          mx="auto"
          my="8"
          objectFit="fill"
          borderRadius="10"
        ></Image>
      </Flex>
      <Heading my="8" lineHeight="1.5">
        <Highlight
          query={["fruity", "Americano", "Long Black"]}
          styles={{ px: "2", py: "1", rounded: "full", bg: "red.400" }}
        >
          As a result, fruity coffee is better for Americano (adding hot water
          to espresso) / Long Black (adding esprsso to hot water)
        </Highlight>
        <Highlight
          query={["nutty", "milk coffee"]}
          styles={{
            px: "2",
            py: "1",
            rounded: "full",
            bg: "gray.700",
            color: "white",
          }}
        >
          , while nutty coffee is better suited for milk coffee.
        </Highlight>
      </Heading>
      <Box flexDirection="column" justifyContent="space-between">
        <Box mb="4">
          <Heading className="mb-4">Coffee Bean Suggestions</Heading>
          <Text fontSize="xl">
            Here is a couple of suggestions of coffee beans for you to try when
            you started to step in the world of black coffee: (My personal
            preference is fruity coffee btw)
          </Text>
          <OrderedList fontSize="xl">
            <ListItem>
              Ethiopia Yirgacheffe / Guji <br />
              Tasting notes: Complex, Fruity, Tea, Floral, Lemon
            </ListItem>
            <ListItem>
              Columbia Hulia <br />
              Tasting notes: Passion Fruit, Grapes, Fruit Tea
            </ListItem>
            <ListItem>
              Any Geisha Coffee (if you are willing to pay the price tag for
              them; a very famous one is Panama La Esmeralda Geisha) <br />
              Tasting notes: Depends on the specific geisha bean; But expect it
              to be super aromatic with a distinct palette.
            </ListItem>
          </OrderedList>
        </Box>
        <Box mb="4">
          <Heading className="mb-4">Coffee shop suggestions</Heading>
          {/* Lets try to implement googlemap api here just for the sake of showing that I know how */}
          <OrderedList fontSize="xl">
            <ListItem>Cafe Revol (It is my all-time favourite cafe! A must try! Their handdrip is really good! And their houseblend, especially thieir fruity aka artistic blend is among the best you can taste in HK)</ListItem>
            <ListItem>Espresso Alchemy</ListItem>
            <ListItem>Reaction Coffee Roasters</ListItem>
          </OrderedList>
        </Box>
      </Box>
    </>
  );
}
