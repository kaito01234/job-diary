import { Box, Flex, Heading, Button } from '@/components/common/chakra';
import NextLink from 'next/link';

export default function Header() {
  return (
    <Box as="header">
      <Flex
        bg="white"
        color="gray.600"
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.200"
        align="center"
      >
        <Flex flex={1} justify="space-between" maxW="5xl" mx="auto">
          <Heading as="h1" size="lg">
            <NextLink href="/">日記</NextLink>
          </Heading>
          <Button
            as={NextLink}
            fontSize="sm"
            fontWeight={600}
            color="white"
            bg="orange.400"
            href="/notes/new"
            _hover={{
              bg: 'orange.300',
            }}
          >
            日記を書く
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
