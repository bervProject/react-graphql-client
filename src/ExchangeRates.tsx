import {
  useQuery,
  gql
} from "@apollo/client";

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container">
      <h2 className="title has-text-light">Exchange Rate</h2>
      <div className="columns is-multiline">
        {
          data.rates.map(({ currency, rate }: any) => (
            <div className="column" key={currency}>
              <div className="box"><p>
                {currency}: {rate}
              </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ExchangeRates;