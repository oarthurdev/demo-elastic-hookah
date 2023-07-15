import React from "react";
import "@elastic/eui/dist/eui_theme_light.css";

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

import moment from "moment";

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import {
  BooleanFacet,
  Layout,
  SingleLinksFacet,
  SingleSelectFacet
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

const connector = new AppSearchAPIConnector({
  searchKey:
    process.env.REACT_APP_SEARCH_KEY || "search-gkutm12o1ofgw64m589inrkm",
  engineName: process.env.REACT_APP_SEARCH_ENGINE_NAME || "my-hookah-engine",
  endpointBase:
    process.env.REACT_APP_SEARCH_ENDPOINT_BASE ||
    "https://49fb6035913647eeb5f8441a9f1a4ec5.ent-search.us-central1.gcp.cloud.es.io"
});

const config = {
  debug: true,
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    result_fields: {
      bar_code: { raw: {} },
      category_id: { raw: {} },
      company_id: { raw: {} },
      image: { raw: {} },
      name: {
        snippet: {
          size: 100,
          fallback: true
        }
      },
      quantity: { raw: {} },
      id: { raw: {} },
      description: {
        snippet: {
          size: 100,
          fallback: true
        }
      }
    },
    disjunctiveFacets: ["acres", "states", "date_established", "location"],
    facets: {
    }
  },
  autocompleteQuery: {
    results: {
      resultsPerPage: 5,
      result_fields: {
        name: {
          snippet: {
            size: 100,
            fallback: true
          }
        }
      }
    },
    suggestions: {
      types: {
        documents: {
          fields: ["name"]
        }
      },
      size: 4
    }
  }
};

const SORT_OPTIONS = [
  {
    name: "Relevance",
    value: []
  },
  {
    name: "Name",
    value: [
      {
        field: "name",
        direction: "asc"
      }
    ]
  },
];

export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched }) => ({
          wasSearched
        })}
      >
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={
                    <SearchBox
                      autocompleteMinimumCharacters={3}
                      autocompleteResults={{
                        linkTarget: "_blank",
                        sectionTitle: "Results",
                        titleField: "name",
                        shouldTrackClickThrough: true,
                        clickThroughTags: ["test"]
                      }}
                      autocompleteSuggestions={true}
                      debounceLength={0}
                    />
                  }
                  sideContent={
                    <div>
                      {wasSearched && (
                        <Sorting label={"Sort by"} sortOptions={SORT_OPTIONS} />
                      )}
                    </div>
                  }
                  bodyContent={
                    <Results
                      titleField="name"
                      thumbnailField="image"
                      shouldTrackClickThrough={true}
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}
