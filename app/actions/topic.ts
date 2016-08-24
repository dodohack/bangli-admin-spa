import { Action }  from '@ngrx/store';
import { Topic } from '../models';

export class TopicActions {
    static SEARCH = '[Topic] Search';
    static search(query:string):Action {
        return {
            type: TopicActions.SEARCH,
            payload: query
        };
    }

    static SEARCH_COMPLETE = '[Topic] Search Complete';
    static searchComplete(results:Topic[]):Action {
        return {
            type: TopicActions.SEARCH_COMPLETE,
            payload: results
        };
    }

    static LOAD_TOPICS = '[Topic] Load Topics';
    static loadTopics(filters:any):Action {
        return {
            type: TopicActions.LOAD_TOPICS,
            payload: filters
        };
    }

    static LOAD_TOPICS_SUCCESS = '[Topic] Load Topics Success';
    static loadTopicsSuccess(topics:Topic[]):Action {
        return {
            type: TopicActions.LOAD_TOPICS_SUCCESS,
            payload: topics
        };
    }

    static LOAD_TOPICS_FAIL = '[Topic] Load Topics Fail';
    static loadTopicsFail():Action {
        return {
            type: TopicActions.LOAD_TOPICS_FAIL,
        };
    }

    static LOAD_TOPIC = '[Topic] Load Topic';
    static loadTopic(id:string):Action {
        return {
            type: TopicActions.LOAD_TOPIC,
            payload: id
        };
    }

    static LOAD_TOPIC_SUCCESS = '[Topic] Load Topic Success';
    static loadTopicSuccess(topic:Topic):Action {
        return {
            type: TopicActions.LOAD_TOPIC_SUCCESS,
            payload: topic
        };
    }

    static LOAD_TOPIC_FAIL = '[Topic] Load Topic Fail';
    static loadTopicFail():Action {
        return {
            type: TopicActions.LOAD_TOPIC_FAIL,
        };
    }

    static AUTO_SAVE = '[Topic] Auto Save';
    static autoSave(topic:Topic):Action {
        return {
            type: TopicActions.AUTO_SAVE,
            payload: topic
        };
    }

    static SAVE_TOPIC = '[Topic] Save Topic';
    static saveTopic(topic:Topic):Action {
        return {
            type: TopicActions.SAVE_TOPIC,
            payload: topic
        };
    }

    static SAVE_TOPICS = '[Topic] Save Topics';
    static saveTopics(topics:Topic[]):Action {
        return {
            type: TopicActions.SAVE_TOPICS,
            payload: topics
        };
    }
}