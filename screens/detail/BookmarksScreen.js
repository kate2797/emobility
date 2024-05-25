import { List } from "react-native-paper";
import Header from "../../components/Header";
import { SafeAreaView, ScrollView } from "react-native";
import stylesheet from "../../styles/stylesheet";
import Bookmark from "../../components/Bookmark";
import useGlobalStore from "../../stores/useGlobalStore";
import { useEffect, useState } from "react";
import { getUserDocument } from "../../services/firestore";
import NothingFound from "../../components/NothingFound";
import { onSnapshot } from "firebase/firestore";
import { createModalOneOption } from "../../utils/generic-utils";
import { NETWORK_ERROR } from "../../constants/messages";

/**
 * A JSX component representing Bookmarking Screen.
 */
export default function BookmarksScreen({ navigation }) {
  const user = useGlobalStore((state) => state.currentUser);
  const [stationBookmarks, setStationBookmarks] = useState([]);
  const [serviceError, setServiceError] = useState("");

  // Side effects
  useEffect(() => {
    const userDoc = getUserDocument(user?.uid);
    const unsubscribeFromFirestore = onSnapshot(
      userDoc,
      (doc) => {
        let bookmarks = doc.get("likedStations");
        setStationBookmarks(bookmarks);
      },
      () => {
        setServiceError(NETWORK_ERROR);
      }
    );
    return () => unsubscribeFromFirestore();
  }, []);

  if (serviceError) {
    createModalOneOption("Error", serviceError);
  }

  return (
    <>
      <Header title="Bookmarked Stations" navigation={navigation} />
      <SafeAreaView edges={["top"]} style={stylesheet.safeArea}>
        <ScrollView>
          <List.Section>
            <List.Subheader>Bookmarked Stations</List.Subheader>
          </List.Section>
          {/* Display all bookmarks */}
          {stationBookmarks.length ? (
            stationBookmarks.map((bookmark) => {
              return (
                <Bookmark
                  key={bookmark.stationId}
                  navigation={navigation}
                  stationId={bookmark.stationId}
                  stationName={bookmark.stationName}
                />
              );
            })
          ) : (
            <NothingFound message="You have no station bookmarks" />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
