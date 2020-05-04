import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');

const ToDo = ({text, isCompleted, id, _checkCompleted, _deleteTodo}) => {
  const [isEditing, setIsEditing] = useState(false);
  // ! completed 의 여부는 app에서 관리 된대
  // ! 추후를 좀더 살펴봐야겠근
  // const [isCompleted, setIsCompleted] = useState(false);
  const [toDoValue, setToDoValue] = useState('');

  const _startEditing = () => {
    setToDoValue(text);
    setIsEditing(true);
  };

  const _finishEditing = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={styles.column}>
          {/* focusing 되어야 한다 */}
          <TextInput
            onBlur={_finishEditing}
            onChangeText={val => setToDoValue(val)}
            placeholder="load data"
            value={toDoValue}
            // multiline={true}
            style={[
              styles.input,
              styles.text,
              isCompleted && styles.completeText,
            ]}
            returnKeyType="done"
          />
        </View>
      ) : (
        <View style={styles.column}>
          <TouchableOpacity onPress={() => _checkCompleted(id)}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completeCircle : styles.unCompleteCircle,
              ]}
            />
          </TouchableOpacity>
          <Text style={[styles.text, isCompleted && styles.completeText]}>
            {text}
          </Text>
        </View>
      )}

      {!isCompleted && (
        <View style={styles.column}>
          {/* 수정 중에 보이는 뷰 */}
          {isEditing ? (
            <View style={styles.actions}>
              <TouchableOpacity onPressOut={_finishEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>💾</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            // 수정 안할때 보이는 뷰
            <View style={styles.actions}>
              <TouchableOpacity onPressOut={_startEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>✏️</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {/* 삭제 할때 보이는 뷰 */}
          {!isEditing && (
            <View style={styles.actions}>
              <TouchableOpacity onPressOut={() => _deleteTodo(id)}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>🗑</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 2,
  },
  completeCircle: {
    borderColor: '#a2f051',
    borderWidth: 8,
  },
  unCompleteCircle: {
    borderColor: '#ccc',
  },
  input: {
    fontSize: 18,
    paddingLeft: 15,
  },
  text: {
    fontSize: 18,
    paddingLeft: 15,
  },
  completeText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  column: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginHorizontal: 5,
    marginVertical: 20,
  },
  actionText: {},
});

ToDo.propsTypes = {
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};

export default ToDo;
